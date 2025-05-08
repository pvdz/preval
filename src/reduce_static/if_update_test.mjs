// Find `if` tests that are mutated in one If and then tested in the next If
// Base case:
//
//    let x = true; if (y) x = false; if (x) z();
// ->
//    if (y) {} else z();
//
// This is low hanging fruit and we can probably improve and generalize on that a bit further

import walk from '../../lib/walk.mjs';
import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  fmat,
  tmat,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifUpdateTest(fdata) {
  group('\n\n\n[ifUpdateTest] Check for if-mutate-test-if-test');
  const ast = fdata.tenkoOutput.ast;
  //currentState(fdata, 'ifUpdateTest'. true, fdata);
  const r = _ifUpdateTest(fdata);
  groupEnd();
  return r;
}
function _ifUpdateTest(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;
  const queue = [];

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'IfStatement') return;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    const if1 = node;
    const if2 = parentNode[parentProp][parentIndex + 1];

    if (if2?.type !== 'IfStatement') return;
    if (if2.test.type !== 'Identifier') return;

    const testName = if2.test.name;

    // Now check whether if2.test was mutated to truthy or falsy value in if1
    // Simplest case: single statement

    // TODO: more generic case of non-empty branches using write count checks et

    const len1c = if1.consequent.body.length;
    const last1c = if1.consequent.body[len1c-1];
    if (
      len1c >= 1 &&
      last1c.type === 'ExpressionStatement' &&
      last1c.expression.type === 'AssignmentExpression' &&
      last1c.expression.left.type === 'Identifier' &&
      last1c.expression.left.name === testName
    ) {
      if (AST.isTruthy(last1c.expression.right) && if2.consequent.body.length === 0) {
        queue.push({
          index: parentIndex,
          func: () => {
            rule('Back to back If where consequent of the first updates the test of the second to truthy can fold up');
            example('let x = false; if ($()) x = true; if (x) {} else $(1);', 'let x = false; if ($()) x = true; else { if (x) {} else $(1); }');
            before(parentNode[parentProp][parentIndex]);
            before(parentNode[parentProp][parentIndex + 1]);

            if1.alternate.body.push(if2);
            parentNode[parentProp][parentIndex + 1] = AST.emptyStatement();

            after(parentNode[parentProp][parentIndex]);
            after(parentNode[parentProp][parentIndex + 1]);
          }
        });
        ++changed;
      }
      else {
        if (AST.isFalsy(last1c.expression.right) && if2.alternate.body.length === 0) {
          queue.push({
            index: parentIndex,
            func: () => {
              rule('Back to back If where consequent of the first updates the test of the second to falsy can fold up');
              example('let x = true; if ($()) x = false; if (x) {} else $(1);', 'let x = false; if ($()) x = true; else { if (x) {} else $(1); }');
              before(parentNode[parentProp][parentIndex]);
              before(parentNode[parentProp][parentIndex + 1]);

              if1.alternate.body.push(if2);
              parentNode[parentProp][parentIndex + 1] = AST.emptyStatement();

              after(parentNode[parentProp][parentIndex]);
              after(parentNode[parentProp][parentIndex + 1]);
            }
          });
          ++changed;
        }
      }
    }
    else {
      const len1a = if1.alternate.body.length;
      const last1a = if1.alternate.body[len1a-1];
      if (
        len1a >= 1 &&
        last1a.type === 'ExpressionStatement' &&
        last1a.expression.type === 'AssignmentExpression' &&
        last1a.expression.left.type === 'Identifier' &&
        last1a.expression.left.name === testName
      ) {
        if (AST.isTruthy(last1a.expression.right) && if2.consequent.body.length === 0) {
          queue.push({
            index: parentIndex,
            func: () => {
              rule('Back to back If where consequent of the first updates the test of the second to truthy can fold up');
              example('let x = false; if ($()) {} else x = true; if (x) {} else $(1);', 'let x = false; if ($()) { if (x) {} else $(1); } else x = true;');
              before(parentNode[parentProp][parentIndex]);
              before(parentNode[parentProp][parentIndex + 1]);

              if1.consequent.body.push(if2);
              parentNode[parentProp][parentIndex + 1] = AST.emptyStatement();

              after(parentNode[parentProp][parentIndex]);
              after(parentNode[parentProp][parentIndex + 1]);
            }
          });
          ++changed;
        }
        else if (AST.isFalsy(last1a.expression.right) && if2.alternate.body.length === 0) {
          queue.push({
            index: parentIndex,
            func: () => {
              rule('Back to back If where consequent of the first updates the test of the second to falsy can fold up');
              example('let x = true; if ($()) {} else x = false; if (x) $(1) else {};', 'let x = false; if ($()) { if (x) $(1) else {}; } else x = true;');
              before(parentNode[parentProp][parentIndex]);
              before(parentNode[parentProp][parentIndex + 1]);

              if1.consequent.body.push(if2);
              parentNode[parentProp][parentIndex + 1] = AST.emptyStatement();

              after(parentNode[parentProp][parentIndex]);
              after(parentNode[parentProp][parentIndex + 1]);
            }
          });
          ++changed;
        }
      }
    }
  }

  if (changed) {

    queue.sort(({ index: a }, { index: b }) => b-a);
    queue.forEach(({ func }) => func());

    log('Ifs folded after if-mutate-test-if-test:', changed, '. Restarting from normalize');
    return {what: 'ifUpdateTest', changes: changed, next: 'normal'};
  }

  log('Ifs folded after if-mutate-test-if-test: 0.');
}
