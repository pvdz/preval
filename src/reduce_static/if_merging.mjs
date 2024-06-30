// Find back-to-back ifs on the same constant condition and merge their branches
// (Invariant: the truthfulness of a constant binding cannot change)
//
//          const x = $(); if (x) a(); else b(); if (x) c(); else d();
// ->
//          const x = $(); if (x) { a(); c(); } else { b(); d(); }

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

export function ifMerging(fdata) {
  group('\n\n\nSearching for back2back ifs to merge\n');
  const r = _ifMerging(fdata);
  groupEnd();
  return r;
}
function _ifMerging(fdata) {
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant && !meta.singleScopeWrites) return; // Cant reliably predict write order. TODO: we only care about multi-scope _writes_...
    if (meta.reads.length < 2) return; // We want to merge two ifs that test on the same constant, so we need at least two reads

    vgroup('- `' + name + '`');

    meta.rwOrder.forEach((ref) => {
      vlog('loop start...', ref.action, ref.kind, ref.node.$p.pid);

      if (ref.action !== 'read') return;
      const read = ref;
      const ifNode = read.parentNode;
      if (read.parentNode.type !== 'IfStatement') return;

      if (!meta.isConstant) {
        // Can only guarantee write order for constants or when there is no write inside the first `if`
        // Other writes are irrelevant since the ifs must be back to back (and we've asserted to be in a single scope)
        // So for each write, confirm that the write does not occur inside this first `if`

        const thenFirstPid = +ifNode.consequent.$p.pid;
        const elseFirstPid = +ifNode.alternate.$p.pid;
        const elseLastPid = +ifNode.alternate.$p.lastPid;

        if (
          meta.writes.some((write) => {
            if (write.kind === 'var') {
              vlog('  - skip the var', write.kind);
              return;
            }
            if (write.kind !== 'assign') {
              vlog("  - non-assignment. there are a few cases, although here I think it's just `for-lhs`?", write.kind);
              return true;
            }

            // If we know that the write in the `then` assigns a truthy value, or the write in the `else` assigns a falsy value
            // then we can still accept this, since we can still safely predict the branch test regardless...

            const rhs = write.parentNode.right;
            const pid = +write.node.$p.pid;
            if (pid >= thenFirstPid && pid <= elseFirstPid) {
              // Write in the `then`
              if (AST.isPrimitive(rhs)) {
                // If the assignment is truthy, return false ("allow"), if it is falsy return true ("disallow")
                const r = !AST.getPrimitiveValue(rhs);
                if (r) vlog('  - assigning a falsy primitive in `then`');
                return r;
              }
              if (rhs.type !== 'Identifier') {
                // TODO: there's probably a few expressions that are guaranteed truthy?
                vlog('  - assigning a non-ident');
                return true;
              }
              // Confirm that the assigned ident is truthy
              const meta = fdata.globallyUniqueNamingRegistry.get(rhs.name);
              if (!meta.typing.mustBeTruthy) {
                vlog('  - Either it is falsy or we do not know. This property should reflect all other known states.');
                return true;
              }

              // Looks like this write was a truthy so we can still proceed
              return;
            } else if (pid >= elseFirstPid && pid <= elseLastPid) {
              // Write in the `else`
              if (AST.isPrimitive(rhs)) {
                // If the assignment is falsy, return false ("allow"), if it is truthy return true ("disallow")
                const r = !!AST.getPrimitiveValue(rhs);
                if (r) vlog('  - assigning a truthy primitive in `else`');
                return r;
              }
              if (rhs.type !== 'Identifier') {
                // TODO: there's probably a few expressions that are guaranteed truthy?
                vlog('  - assigning a non-ident');
                return true;
              }
              // Confirm that the assigned ident is truthy
              const meta = fdata.globallyUniqueNamingRegistry.get(rhs.name);
              if (!meta.typing.mustBeFalsy) {
                vlog('  - Either it is truthy or we do not know. This property should reflect all other known states.');
                return true;
              }

              // Looks like this write was a falsy so we can still proceed
            }
          })
        ) {
          return vlog('  - There is a write inside the first `if`. See previous log line for details');
        }
      }

      vlog('- Testing read that is used in an `if`');
      const if2Node = read.blockBody[read.blockIndex + 1];
      if (if2Node?.type !== 'IfStatement') return vlog('  - Read was an if-test but the if was not followed by another if');
      if (if2Node.test.type !== 'Identifier') return vlog('  - Next if did not test for ident');
      if (if2Node.test.name !== name) return vlog('  - Next if did not test for this ident');

      vlog('  - Found! Queued for transformation');
      queue.push({
        index: read.blockIndex,
        func: () => {
          rule('Back to back ifs testing on the same constant can be merged');
          example('const x = f(); if (x) a(); else b(); if (x) c(); else d();', 'const x = f(); if (x) { a(); c(); } else { b(); d(); }');
          before(ifNode);
          before(if2Node);

          // We should now have a back2back if that tests on the same constant ... we can merge them!
          ifNode.consequent.body.push(...if2Node.consequent.body);
          ifNode.alternate.body.push(...if2Node.alternate.body);
          read.blockBody.splice(read.blockIndex + 1, 1);

          after(ifNode);
        },
      });
    });

    vgroupEnd();
  });

  if (queue.length) {
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Ifs merged:', queue.length, '. Restarting from phase1');
    return 'phase1';
  }

  log('Ifs merged: 0.');
}
