// Find ANDed values used as an `if` test condition where the value of the var inside each branch is known.
//
//      const x = y & 1; if (y) $(x); else $(x);
// ->
//      const x = y & 1; if (x) $(1); else $(0);
//
//
//      const x = y < 10; if (y) $(x < 20); else $(x < 5);
// ->
//      const x = y < 10; if (y) $(true); else $(false);
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifTestAnded(fdata) {
  group('\n\n\n[ifTestAnded] Checking for if-tests on ANDed values');
  //currentState(fdata, 'ifTestAnded', true, fdata);
  const r = _ifTestAnded(fdata);
  groupEnd();
  return r;
}
function _ifTestAnded(fdata) {
  let changed = 0;

  vlog('Searching for const decls that have an interesting init and are used as an if-test at least once...');

  fdata.globallyUniqueNamingRegistry.forEach((meta, varName) => {
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return;
    if (meta.reads.length < 2) return; // Need an if-test and at least one read inside that if, so at least two reads.

    const write = meta.writes[0];
    const varNode = write.parentNode;
    const init = varNode.init;

    if (init.type !== 'BinaryExpression') return;
    if (init.operator !== '&') return;

    // What's faster now. Checking the init? Checking for an if-test occurrence? Do we do this often? Should we phase1 it on meta?
    vlog('- Candidate:', varName, 'being ANDED');

    const ipleft = AST.isPrimitive(init.left);
    const ipright = AST.isPrimitive(init.right);

    if (!ipleft && !ipright) return vlog('- bail: either side not primitive'); // TODO: transitively? probably much harder to get a concrete value here.
    let ifs = [];
    meta.reads.forEach(read => {
      if (read.parentProp === 'test' && read.parentNode.type === 'IfStatement') {
        ifs.push(read.parentNode); // I don't think there's a point in storing the read...?
      }
    });
    if (!ifs.length) return;
    // Do we check here whether at least one read is scoped inside those if-nodes? Or later.

    vgroup('- Found eligible const:', [varName], 'with ANDed init and', meta.reads.length, 'reads');

    const primLeft = ipleft && AST.getPrimitiveValue(init.left);
    const primRight = ipright && AST.getPrimitiveValue(init.right);

    // If we know the value for one side then we know the value of the other side.
    // We would also know that certain values get coerced to zero (or even non-zero) but we'll skip on that for now.

    if (typeof primLeft === 'number' || typeof primRight === 'number') {
      // One side was a number. Try to inline them.

      for (const { read, ifNode, branch } of readsInsideIfs(meta.reads, ifs)) {
        if (branch) {
          // Note: it is important to ensure only 1 bit is set in the value, otherwise we can't predict which of the bits are set/unset now.
          const p = typeof primLeft === 'number' ? primLeft : primRight;
          if (p > 0 && (p & (p - 1)) === 0) { // "is single bit set?" bithack
            // This read falls in the consequent branch so we know it is less than <primRight>
            vlog('found ref in then-branch while also being tested, so it must be', p);
            rule('When a ref is if-tested and in then-branch used and ref is single-bit ANDed then we know the result');
            example('const x = y & 8; if (x) $(x); else $(x);', 'const x = y & 8; if (x) $(8); else $(0);');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.primitive(p);
            else read.parentNode[read.parentProp][read.parentIndex] = AST.primitive(p);

            after(write.blockBody[write.blockIndex]);
            after(read.blockBody[read.blockIndex]);
            changed += 1;
            return;
          }
        } else {
          // Note: it is important to ensure only 1 bit is set in the value, otherwise we can't predict which of the bits are set/unset now.
          // Note: we know that the "false" result of `&` is always zero.
          // const p = typeof primLeft === 'number' ? primLeft : primRight;
          // if (p > 0 && (p & (p - 1)) === 0) { // "is single bit set?" bithack
          // This read falls in the alternate branch so we know it is more-than-or-equal-to <primRight>
          vlog('found ref in then-branch while also being tested, so it must be', 0);
          rule('When a ref is if-tested and in else-branch used and ref is single-bit ANDed then we know the result');
          example('const x = y & 8; if (x) $(x); else $(x);', 'const x = y & 8; if (x) $(8); else $(0);');
          before(write.blockBody[write.blockIndex]);
          before(read.blockBody[read.blockIndex]);

          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.primitive(0);
          else read.parentNode[read.parentProp][read.parentIndex] = AST.primitive(0);

          after(write.blockBody[write.blockIndex]);
          after(read.blockBody[read.blockIndex]);
          changed += 1;
          // }
        }
      }
    }

    vgroupEnd();
  });

  if (changed) {
    log('If tests ANDed:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifTestAnded', changes: changed, next: 'phase1'};
  }

  log('If tests ANDed: 0.');
}

// Given a set of reads and array of if-nodes, yield for each read that occurs inside a branch
// of a node. Do not trigger for the (own) if-test of those nodes. Just inside the branch blocks.
// The yielded value will tell you the read, the node, and whether it's then or else branch.
function * readsInsideIfs(reads, ifNodes) {
  for (const ifNode of ifNodes) {
    // Get the pid before-middle-after the if-node. We need to know where each read falls.
    const pid1 = ifNode.consequent.$p.npid;
    const pid2 = ifNode.alternate.$p.npid; // mid
    const pid3 = ifNode.$p.lastPid;

    // Ok, now every read that falls within this if-node has a known range
    for (const read of reads) {
      const pid = read.node.$p.npid;
      if (pid > pid1) {
        if (pid < pid2) { // (exclusive, not that it matters here)
          // This read falls in the consequent branch so we know it is less than <primRight>
          yield { read, ifNode, branch: true };
        } else if (pid <= pid3) { // (inclusive, it matters here)
          // This read falls in the alternate branch so we know it is more-than-or-equal-to <primRight>
          yield { read, ifNode, branch: false };
        } else {
          // read falls after the if-node, skip to next.
        }
      }
    }
  }
}
