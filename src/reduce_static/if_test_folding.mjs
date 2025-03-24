// Search for `if` statements where both branches basically reflect the test result
//
//        if (x) return true; else return false;
// ->
//        return x;

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
import { createFreshVar } from '../bindings.mjs';

export function ifTestFolding(fdata) {
  group('\n\n\nSearching for ifs where the branches reflect the test\n');
  const r = _ifTestFolding(fdata);
  groupEnd();
  return r;
}
function _ifTestFolding(fdata) {
  const ast = fdata.tenkoOutput.ast;

  const queue = [];

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;

    if (node.test.type !== 'Identifier') return;
    const testMeta = fdata.globallyUniqueNamingRegistry.get(node.test.name);
    if (testMeta.isImplicitGlobal) return; // Crashing is observable

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    const firstThen = node.consequent.body[0];
    const firstElse = node.alternate.body[0];

    vgroup('Checking if both branches assign an opposite boolean');
    if (
      node.consequent.body.length === 1 &&
      node.alternate.body.length === 1 &&
      firstThen.type === 'ExpressionStatement' &&
      firstElse.type === 'ExpressionStatement' &&
      firstThen.expression.type === 'AssignmentExpression' &&
      firstElse.expression.type === 'AssignmentExpression' &&
      firstThen.expression.left.type === 'Identifier' &&
      firstElse.expression.left.type === 'Identifier' &&
      // Are they an assignment of a bool?
      AST.isBoolean(firstThen.expression.right) &&
      AST.isBoolean(firstElse.expression.right) &&
      // Is the assignment to the same ident?
      firstThen.expression.left.name === firstElse.expression.left.name &&
      // Are they assigning an opposite bool?
      firstThen.expression.right.value !== firstElse.expression.right.value
    ) {
      vlog('Heuj this is the `if (x) a = true else a = false` pattern');
      // Two cases:
      // - the test is known to be a boolean -> assign x or !x depending on the rhs
      // - the test is not known to be a boolean -> assign the result of Boolean(x) or !x depending on the rhs

      const testIsBool = testMeta.typing.mustBeType === 'boolean';
      const flip = firstThen.expression.right.value === false;

      queue.push({
        pid: +node.$p.pid,
        func: () => {
          rule('Matching bool assign on bool if-test should be explicit');
          example('const x = Boolean(y); if (x) a = true; else b = false;', 'const x = Boolean(y); a = x', () => testIsBool && !flip);
          example('if (x) a = true; else b = false;', 'const x = Boolean(y); a = Boolean(x)', () => !testIsBool && !flip);
          example('const x = Boolean(y); if (x) a = false; else b = true;', 'const x = Boolean(y); a = !x;', () => testIsBool && flip);
          example('if (x) a = false; else b = true;', 'const x = Boolean(y); a = !x;', () => !testIsBool && flip);
          before(node, parentNode);

          // Replace the `if` with an assignment to the binding that's updated in each branch.
          // If the current assignment assigned `true` in the `then` branch, assign the var directly
          // Otherwise assign the `!` of the test. This is what basically happens.
          // If the test was known to be bool, don't wrap it in Boolean(), otherwise do.

          const finalNode = AST.expressionStatement(
            AST.assignmentExpression(
              firstElse.expression.left.name,
              flip
                ? AST.unaryExpression('!', AST.cloneSimple(node.test))
                : testIsBool
                ? AST.cloneSimple(node.test)
                : AST.callExpression('Boolean', [AST.cloneSimple(node.test)]),
            ),
          );
          parentNode[parentProp][parentIndex] = finalNode;

          after(finalNode, parentNode);
        },
      });
      vgroupEnd();
      return;
    }
    vgroupEnd();

    vgroup('Checking if both branches return an opposite boolean');
    if (
      node.consequent.body.length === 1 &&
      node.alternate.body.length === 1 &&
      firstThen.type === 'ReturnStatement' &&
      firstElse.type === 'ReturnStatement' &&
      // Are they returning a bool?
      AST.isBoolean(firstThen.argument) &&
      AST.isBoolean(firstElse.argument) &&
      // Is it returning the same ident?
      firstThen.argument.name === firstElse.argument.name &&
      // Are they returning an opposite bool?
      firstThen.argument.value !== firstElse.argument.value
    ) {
      vlog('Heuj this is the `if (x) return true else return false` pattern');
      // Two cases:
      // - the test is known to be a boolean -> assign x or !x depending on the rhs
      // - the test is not known to be a boolean -> assign the result of Boolean(x) or !x depending on the rhs

      const testIsBool = testMeta.typing.mustBeType === 'boolean';
      const flip = firstThen.argument.value === false;
      queue.push({
        pid: +node.$p.pid,
        func: () => {
          rule('Matching bool return on bool if-test should be explicit');
          example('const x = Boolean(y); if (x) return true; else return false;', 'const x = Boolean(y); a = x', () => testIsBool && !flip);
          example('if (x) return true; else return false;', 'a = Boolean(x)', () => !testIsBool && !flip);
          example(
            'const x = Boolean(y); if (x) return false; else return true;',
            'const x = Boolean(y); a = !x;',
            () => testIsBool && flip,
          );
          example('if (x) return false; else return true;', 'a = !x;', () => !testIsBool && flip);
          before(node, parentNode);

          // Replace the if statement with a return statement. When the if-test was not known to be boolean, also
          // splice in a temporary assignment that gets a boolean result from the value (through `Boolean` or `!`).

          let finalNodes;
          if (testIsBool && !flip) {
            finalNodes = [AST.returnStatement(AST.cloneSimple(node.test))];
          } else {
            const tmpName = createFreshVar('tmpIfTestFold', fdata);
            finalNodes = [
              AST.varStatement(
                'const',
                tmpName,
                flip ? AST.unaryExpression('!', AST.cloneSimple(node.test)) : AST.callExpression('Boolean', [AST.cloneSimple(node.test)]),
              ),
              AST.returnStatement(AST.identifier(tmpName)),
            ];
          }

          parentNode[parentProp].splice(parentIndex, 1, ...finalNodes);

          after(finalNodes, parentNode);
        },
      });
      vgroupEnd();
      return;
    }
    vgroupEnd();
  }

  vlog('Found', queue.length, 'if statements that qualify');

  if (queue.length) {
    // Order in reverse order. Later changes won't affect index references of earlier nodes.
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));

    vgroup('Processing ifs now');
    queue.forEach(({ func }) => func());
    vgroupEnd();

    log('Extended branches:', queue.length, '. Restarting from phase1');
    return {what: 'ifTestFolding', changes: queue.length, next: 'phase1'};
  }

  log('Extended branches: 0.');
}
