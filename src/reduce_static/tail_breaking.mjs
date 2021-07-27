// Find `break` and `continue` statements that are at the end of a branch and are redundant. Also checks their labels.
// `foo: { if (x) break foo; } else { f(); } }`
// -> `foo: { if (x) {} else { f(); } }`

// We could do this during normalization but since it heavily messes with the label tracking, it's just easier to do it in a phase2 step.

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
    // - switches (irrelevant in normalized code)
    // - labels

    // Unlabeled breaks in a loop cannot be eliminated. There is no switch in normalized code so this
    // means the unlabeled break can never be eliminated.

    // In the following description, a "tail" position means the statement is the last statement in all
    // blocks up to the targeted loop or label.

    // Unlabeled continues can be eliminated if they appear in a tail position.
    // Labeled breaks can be dropped if they are in the tail position all the way up to the target
    // label without crossing a loop boundary.
    // Labeled breaks must stay if they are inside a loop and the target abel is outside of it, since
    // it stops the loop. In that case the label can be removed from it if it is tail up to the loop
    // but only if it only crosses one loop boundary.

    if (beforeWalk) return;
    const isBreak = nodeType === 'BreakStatement';
    if (!isBreak && nodeType !== 'ContinueStatement') return;
    if (isBreak && !node.label) return; // Unlabeled breaks are only allowed in situations where we could never eliminate them

    // Walk the stack down to the labeled statement that represents this node
    // This label is guaranteed to exist otherwise we are in an inconsistent state

    let currentIndex = path.indexes[path.indexes.length - 1];

    vlog('Scanning whether a', nodeType, node.label ? 'with label `' + node.label.name + '`' : 'without label' + ' is in tail position');
    let n = path.nodes.length - 2; // (node is at -1)
    let hadLoop = false;

    while (n >= 0) {
      const next = path.nodes[n];
      vlog('Next:', next.type, ', index:', currentIndex, 'len:', next.body?.length);
      if (next.type === 'BlockStatement') {
        if (currentIndex !== next.body.length - 1) {
          vlog('- Not last element. Bailing');
          return;
        }
      } else if (next.type === 'LabeledStatement') {
        if (next.label.name === node.label?.name) {
          if (hadLoop) {
            if (isBreak) {
              vlog(
                '- Found target label node. That means we can drop the label from this break. But since we broke through a loop, we must keep the break.',
              );
            } else {
              vlog('- Found target label node. That means we can eliminate this continue.');
            }
          } else {
            vlog('- Found target label node. That means we can eliminate this break.');
          }
          break;
        }
      } else if (['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(next.type)) {
        if (hadLoop) {
          if (isBreak) {
            vlog('- This break breaks through at least two loops. Cannot change that. Bailing.');
          } else {
            vlog('- This continue breaks through at least one loop. Cannot change that. Bailing.');
          }
          return;
        }

        if (isBreak) {
          vlog('- Found a loop node. This means the break can not be eliminated. The label may still be eliminated.');
        } else {
          if (node.label) {
            vlog('- Found a loop node. If the parent is the target label, then this continue can be dropped. Otherwise it cannot.');
          } else {
            vlog('- Found a loop node. The continue has no label so this is the target and we can eliminate the conteinue.');
            break;
          }
        }

        hadLoop = true;
      } else if (next.type === 'TryStatement' && path.props[n] === 'finalizer') {
        // `foo: try { return 1; } finally { break foo; }` prevents the return. we can support this but it's way more work. not worth.
        vlog('- Should skip breaks/continues in a finally because they prevent a different exit');
        return;
      }

      currentIndex = path.indexes[n];
      --n;
    }
    ASSERT(n >= 0, 'must find target label');

    // So we can either drop the break, and otherwise at least its label

    if (hadLoop && !isBreak) {
      rule('If a labeled break is in a tail position but crosses a loop the label can be dropped');
      example('foo: while(true) break foo;', 'foo: while(true) break;');
      before(node);

      node.label = null;

      after(node);
      ++changed;
    } else {
      rule('If a labeled break/continue only appears in a tail position up to its label, it can be removed');
      example('foo: { if (x) { f(); break foo; } else { g(); } }', 'foo: { if (x) { f(); } else { g(); } }');
      before(node);

      const parentNode = path.nodes[path.nodes.length - 2];
      const parentProp = path.props[path.props.length - 1];
      const parentIndex = path.indexes[path.indexes.length - 1];

      if (parentIndex < 0) parentNode[parentProp] = AST.emptyStatement();
      else parentNode[parentProp][parentIndex] = AST.emptyStatement();

      after(AST.emptyStatement());
      ++changed;
    }
  }

  if (changed) {
    log('Breaks and continues eliminated:', changed, '. Restarting from phase1');
    return 'phase1';
  }

  log('Breaks and continues eliminated: 0.');
}
