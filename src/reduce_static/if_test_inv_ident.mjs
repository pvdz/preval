// Find `if` tests on an inverted ident
//
//      const x = !y; if (x) { a } else { b }
// ->
//      const x = !y; if (y) { b } else { a }
//
// Doesn't matter if that's a const or a let or even a regular assignment as long as there is no observable in between

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
  findBodyOffset, todo,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifTestInvIdent(fdata) {
  group('\n\n\nChecking for if-tests on inverted idents');
  const ast = fdata.tenkoOutput.ast;
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _ifTestInvIdent(fdata);
  groupEnd();
  return r;
}
function _ifTestInvIdent(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'IfStatement') return;

    if (node.test.type !== 'Identifier') return;

    vlog('If on ident');

    // Check if the ident was assigned/created in the previous statement
    const pathNodes = path.nodes;
    const pathProps = path.props;
    const pathIndexes = path.indexes;
    const parentNode = pathNodes[pathNodes.length - 2];
    const parentProp = pathProps[pathProps.length - 1];
    const parentIndex = pathIndexes[pathIndexes.length - 1];

    if (parentIndex === 0) return;

    const prev = parentNode[parentProp][parentIndex-1];

    if (prev.type === 'VariableDeclaration') {
      if (prev.declarations[0].id.name === node.test.name) {
        // This is a var decl of the test
        const init = prev.declarations[0].init;
        if (init.type === 'UnaryExpression' && init.operator === '!' && init.argument.type === 'Identifier') {
          // It should be safe to make the transform
          rule('An `if` that tests the result of inverting an ident can test for that ident instead');
          example('const x = !y; if (x) a; else b;', 'const x = !y; if (y) b; else a;');
          before(prev);
          before(node);

          node.test = AST.identifier(init.argument.name);
          const tmp = node.alternate;
          node.alternate = node.consequent;
          node.consequent = tmp;

          after(prev);
          after(node);
          changed += 1;
        }
      }
    }
    else if (prev.type === 'ExpressionStatement') {
      if (
        prev.expression.type === 'AssignmentExpression' &&
        prev.expression.left.type === 'Identifier' &&
        prev.expression.left.name === node.test.name
      ) {
        // This is an assignment to the test
        const right = prev.expression.right;
        if (right.type === 'UnaryExpression' && right.operator === '!' && right.argument.type === 'Identifier') {
          // It should be safe to make the transform
          rule('An `if` that tests the result of inverting an ident can test for that ident instead');
          example('x = !y; if (x) a; else b;', 'const x = !y; if (y) b; else a;');
          before(prev);
          before(node);

          node.test = AST.identifier(right.argument.name);
          const tmp = node.alternate;
          node.alternate = node.consequent;
          node.consequent = tmp;

          after(prev);
          after(node);
          changed += 1;
        }
      }
    }
  }

  if (changed) {
    log('Inverted if test idents swapped:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifTestBool', changes: changed, next: 'phase1'};
  }

  log('Inverted if test idents swapped: 0.');
}
