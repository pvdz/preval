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

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  fmat,
  tmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {hasObservableSideEffectsBetweenRefs} from "../ast.mjs"

export function letAliasRedundant(fdata) {
  group('\n\n\n[letAliasRedundant] Searching for let-as-const aliases that are redundant\n');
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

    // Check if rhs is `let` binding

    const init = constMeta.varDeclRef.node;
    if (init?.type !== 'Identifier') return;
    const letName = init.name;

    const letMeta = fdata.globallyUniqueNamingRegistry.get(letName);
    if (!(letMeta?.writes?.length > 1)) return; // Simplify search; you must not be a let if you're not written to twice or more
    if (letMeta.isBuiltin) return;
    if (letMeta.isImplicitGlobal) return;
    if (letMeta.isConstant) return; // Don't think this is possible at this point but ok

    vlog(`It seems const \`${constName}\` is a const that is the alias of let \`${letName}\``);

    // Now verify whether the let has a write in a function other than the one it was declared in

    let func;
    let writeInClosure = letMeta.writes.some(write => {
      if (!func) func = write.funcChain;
      else if (func !== write.funcChain) return true;
      return false;
    });
    if (writeInClosure) return vlog('  - Bail: the let has at least two writes with different functions');

    // TDZ be danged, the let decl should be the first write.

    if (letMeta.writes[0].blockBody[letMeta.writes[0].blockIndex]?.type !== 'VarStatement') {
      return vlog('  - Bail: first write of let was not a var decl');
    }

    // All writes are in the same function, let starts with decl, now check if there's a write between the const decl and its first read

    const constWrite = constMeta.writes[0];
    ASSERT(constWrite);

    const constRead = constMeta.reads[0];
    ASSERT(constRead);

    if (constRead.node.$p.pid < constWrite.node.$p.pid) return vlog('  - Bail: first read of const occurs before its write');

    // Final check: if there's no read between the const write and its first read then it cannot have been mutated for that would
    // require either direct code doing it (which it can't if it does not refer to the let) or a function doing it indirectly
    // and we've already asserted that there's no write in other functions so that's impossible too.
    // I don't think a let can change in any other way so this should prove the let is unchanged.

    let bad = false;
    for (let i=0; i<letMeta.writes.length; ++i) {
      const pid = +letMeta.writes[i].node.$p.pid;
      if (pid > constWrite.node.$p.pid && pid < constRead.node.$p.pid) {
        vlog(`  - The write pid ${pid} occurs between ${+constWrite.node.$p.pid} and ${+constRead.node.$p.pid}`);
        bad = true;
        break;
      }
    }
    if (bad) return vlog('  - Bail: at least one write occurred between the const decl and its first read');

    // I think we've found an eligible target.

    rule('Given a const let alias, when there is no mutation of the let between the const decl and its first read, then the read is really to the let');
    example('let x = 1; const y = x; $(); $(y);', 'let x = 1; $(); $(x);');
    before(letMeta.writes[0].grandNode);
    before(constMeta.varDeclRef.varDeclNode);
    before(constRead.blockBody[constRead.blockIndex]);

    if (constRead.parentIndex < 0) constRead.parentNode[constRead.parentProp] = AST.identifier(letName);
    else constRead.parentNode[constRead.parentProp][constRead.parentIndex] = AST.identifier(letName);


    after(letMeta.writes[0].grandNode);
    after(constMeta.varDeclRef.varDeclNode);
    after(constRead.blockBody[constRead.blockIndex]);

    changed += 1;
  });

  if (changed) {
    log('Let const aliases removed:', changed, '. Restarting from phase1');
    return {what: 'letAliasRedundant', changes: changed, next: 'phase1'};
  }

  log('Let const aliases removed: 0.');
}
