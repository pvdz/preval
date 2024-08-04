// Find `break` and `continue` statements that are at the end of a branch and are redundant. Also checks their labels.
// `foo: { if (x) break foo; } else { f(); } }`
// -> `foo: { if (x) {} else { f(); } }`

// We could do this during normalization but since it heavily messes with the label tracking, it's just easier to do it in a phase2 step.

// TODO: this could also detect the pseudo-labelless-break `foo: { while (true) break foo; }` and its variations

import walk from '../../lib/walk.mjs';
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

export function tailBreaking(fdata) {
  group('\n\n\nFind redundant break and continue statements or labels\n');
  const r = _tailBreaking(fdata);
  groupEnd();
  return r;
}
function _tailBreaking(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    // We have to track going into and out of certain nodes
    // - blocks
    // - loops
    // - labels
    // Unlabeled breaks in a loop cannot be eliminated.

    // There is no continue or switch in normalized code.

    // In the following description, a "tail" position means the statement is the last statement in all blocks up to the targeted loop or label.

    // Labeled breaks can be dropped if they are in the tail position all the way up to the target label without crossing a loop boundary.
    // Labeled breaks must stay if they are inside a loop while the target label is outside of it, since it stops the loop.

    // We only target labeled breaks on the way back up
    if (beforeWalk) return;
    if (nodeType !== 'BreakStatement') return;
    if (!node.label) return; // Unlabeled breaks are only allowed in situations where we could never eliminate them

    // Walk the stack down to the labeled statement that this break targets
    // This label is guaranteed to exist otherwise we are in an inconsistent state

    let currentIndex = path.indexes[path.indexes.length - 1];

    vlog('Scanning whether a break', node.label ? 'with label `' + node.label.name + '`' : 'without label' + ' is in tail position');
    let n = path.nodes.length - 2; // (node is at -1)

    while (n >= 0) {
      const next = path.nodes[n];
      vlog('Next:', next.type, ', index:', currentIndex, 'len:', next.body?.length);

      if (next.type === 'WhileStatement') {
        vlog('- Found a loop node. This means the break can not be eliminated.');
        return;
      }

      if (next.type === 'BlockStatement' && currentIndex !== next.body.length - 1) {
        vlog('- Not tail element. Bailing');
        return;
      }

      if (next.type === 'LabeledStatement' && next.label.name === node.label?.name) {
        vlog('- Found target label node. That means we can eliminate this break.');
        break;
      }

      currentIndex = path.indexes[n];
      --n;
    }
    ASSERT(n >= 0, 'must find target label');

    // So we can drop the break

    rule('If a labeled break/continue only appears in a tail position up to its label, without loops, it can be removed');
    example('foo: { if (x) { f(); break foo; } else { g(); } }', 'foo: { if (x) { f(); } else { g(); } }');
    const parentNode = path.nodes[path.nodes.length - 2];
    before(node, parentNode);

    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    if (parentIndex < 0) parentNode[parentProp] = AST.emptyStatement();
    else parentNode[parentProp][parentIndex] = AST.emptyStatement();

    after(AST.emptyStatement(), parentNode);
    ++changed;
  }

  if (changed) {
    log('Breaks and continues eliminated:', changed, '. Restarting from phase1');
    return {what: 'tailBreaking', changes: changed, next: 'phase1'};
  }

  log('Breaks and continues eliminated: 0.');
}
