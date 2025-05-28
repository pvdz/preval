// Search for const aliasing of a let where the alias is unnecessary
//
// `let x = $; const y = x; $(); $(y); x += 1; $(x);`
// -> `let x = $; $(); $(x); x += 1; $(x);`
//
// The idea is that as long as the let is not in a closure (eg. can be modified from another function)
// or even worst case, not written to from another function, and it does not occur (or again, not written
// to) between the alias decl and the first read of that alias, then that first read may as well refer
// to that let directly instead.
// This logic survives reference mutability (x.prop = foo) because the core here is the reference value
// being retained by the pointer and not the layout of that value in memory.
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, currentState, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { hasSingleScopedWrites } from '../bindings.mjs';

export function letAliasRedundant(fdata) {
  group('\n\n\n[letAliasRedundant] Searching for let-as-const aliases that are redundant\n');
  // currentState(fdata, 'letAliasRedundant', true, fdata);
  const r = _letAliasRedundant(fdata);
  groupEnd();
  return r;
}
function _letAliasRedundant(fdata) {
  let changed = 0;
  let matches = [];
  fdata.globallyUniqueNamingRegistry.forEach((constMeta, constName) => {
    // We're searching for a const decl with a let binding as init

    if (constMeta.isBuiltin) return;
    if (constMeta.isImplicitGlobal) return;
    if (!constMeta.isConstant) return; // Targeting lets only
    if (!constMeta.reads.length) return; // Dead code

    // Check if rhs is `let` binding

    const init = constMeta.varDeclRef.node;
    if (init?.type !== 'Identifier') return;
    const letName = init.name;

    const letMeta = fdata.globallyUniqueNamingRegistry.get(letName);
    if (!(letMeta?.writes?.length > 1)) return; // Simplify search; you must not be a let if you're not written to twice or more
    if (letMeta.isBuiltin) return;
    if (letMeta.isImplicitGlobal) return;
    if (letMeta.isCatchVar) return;
    if (letMeta.isExport) return;
    if (letMeta.isConstant) return; // Technically possible, though unlikely. Certainly not a let.

    const constWrite = constMeta.writes[0];
    ASSERT(constWrite?.kind === 'var', 'there is a write and it is the decl, yes?', constWrite);

    const letDeclWrite = letMeta.writes[0];
    if (letDeclWrite.kind !== 'var') return vlog('  - Bail: first write of let was not a var decl');

    // Both vars must be declared in same function scope. Otherwise we don't know which value was assigned to the const.
    if (constWrite.funcChain !== letDeclWrite.funcChain) return vlog('  - Bail: vars are not declared inside same func');

    vlog(`It seems const \`${constName}\` is a const that is the alias of let \`${letName}\``, );

    // Now verify whether the let has a write in a function other than the one it was declared in
    // (This is not the same as .singleScoped, we only care to track if the writes are here)

    if (!hasSingleScopedWrites(letMeta)) return vlog('  - Bail: the let has at least two writes with different functions');

    // All writes are in the same function, `let` starts with decl, now check if there's a write between the const decl and its first read

    // The const may be a closure. In that case one or more reads may be in a different func scope. Ignore those reads.
    // The important bit here is that all reads would read the same constant value. If we can prove that the assigned
    // ident does not change between a const decl and const read then it's effectively an alias.

    const firstPid = +constWrite.node.$p.pid;
    constMeta.reads.forEach(read => {
      // First do a func scope check. Ignore anything that's not in same scope. We can only
      if (read.funcChain !== constWrite.funcChain) return;

      // Confirm that the read is in same loop as its decl. Loops can break the invariant that we test here.
      if (read.innerLoop !== constWrite.innerLoop) {
        // nested part will be difficult. unless we set start/end pid instead of inner loop (same for others). helpful or noise?
        // what if we stored the loopChain instead. Then we can do prefix checks for this sort of thing ...
        todo('we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested');
        return vlog('  - Bail: read is not loop as decl');
      }

      const readPid = +read.node.$p.pid;

      // Now do write bounds check. Ignore read that has a write of the `let` var between the const decl and the read.
      if (letMeta.writes.every(write => {
        const pid = +write.node.$p.pid;
        // One edge case: the pid of the write `rhs = lhs` will be higher than the read pid because it is visit order, not source order.
        // This would be `let x = 1; const y = x; x = y;`, in which case it's indeed `x=x` so that's fine.
        vlog('- write pid: @', pid, ', violation:', pid > firstPid && pid < readPid);
        if (pid > firstPid && pid < readPid) {
          // TODO: What if the write is in a different branch from the read? `let a = 1; const b = a; if (x) a = 2; else $(b)`, b is an alias
          //       This also applies when the branch is in an ancestor if-node. we can't easily do this in preval.
          //       We do have ref.ifChain ... so maybe that could work? tbd.
          vlog('At least one right of the rhs was between the decl and the end of the block with the decl so we must bail');
          return false;
        }
        return true;
      })) {

        // I think we've found an eligible target.

        rule('Given a const let alias, when there is no mutation of the let between the const decl and its first read, then the read is really to the let');
        example('let x = 1; const y = x; $(); $(y);', 'let x = 1; $(); $(x);');
        before(letDeclWrite.blockBody[letDeclWrite.blockIndex]);
        before(constWrite.blockBody[constWrite.blockIndex]);
        before(read.blockBody[read.blockIndex]);

        if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(letName);
        else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(letName);

        after(letDeclWrite.blockBody[letDeclWrite.blockIndex]);
        after(constWrite.blockBody[constWrite.blockIndex]);
        after(read.blockBody[read.blockIndex]);

        changed += 1;
      }
    })
  });

  if (changed) {
    log('Let const aliases removed:', changed, '. Restarting from phase1');
    return {what: 'letAliasRedundant', changes: changed, next: 'phase1'};
  }

  log('Let const aliases removed: 0.');
}
