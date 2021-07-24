// Find back-to-back ifs on the same constant condition and merge their branches
// `const x; if (x) a(); else b(); if (x) c(); else d();`
// -> `const x; if (x) { a(); c(); } else { b(); d(); }`

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

    meta.rwOrder.forEach((ref) => {
      if (ref.action !== 'read') return;
      const read = ref;
      const ifNode = read.parentNode;
      if (read.parentNode.type !== 'IfStatement') return;

      if (!meta.isConstant) {
        // Can only guarantee write order for constants or when there is no write inside the first `if`
        // Other writes are irrelevant since the ifs must be back to back (and we've asserted to be in a single scope)
        // So for each write, confirm that the write does not occur inside this first `if`

        const thenFirstPid = +ifNode.consequent.$p.pid;
        const elseLastPid = +ifNode.alternate.$p.lastPid;

        if (meta.writes.some(write => +write.node.$p.pid >= thenFirstPid && +write.node.$p.pid <= elseLastPid)) {
          return vlog('  - There is a write inside the first `if`');
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
  });

  if (queue.length) {
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Ifs merged:', queue.length, '. Restarting from phase1');
    return 'phase1';
  }

  log('Ifs merged: 0.');
}
