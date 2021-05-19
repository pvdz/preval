// Find the pattern of updating a binding at the end of both branches of an `if` statement, followed by a call using that binding.
// `if (a) x = 1; else x = 2; f(x)` -> `if (a) f(1); else f(2);`

/*
TODO: next level is detecting it in helper functions

const isBadTickToken = function (v) {
  const t = v & 1048576;
  const r = t === 1048576;
  return r;
};
const x = isBadTickToken(lastType);
if (x) {
  ...
}
 */

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
import { createFreshVar, getIdentUsageKind } from '../bindings.mjs';

export function ifUpdateCall(fdata) {
  group('\n\n\nFinding if-update-call patterns to replace\n');
  const r = _ifUpdateCall(fdata);
  groupEnd();
  return r;
}
function _ifUpdateCall(fdata) {
  let inlined = 0;
  const ast = fdata.tenkoOutput.ast;

  const queue = [];

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;

    if (!node.$p.alwaysComplete) {
      const lastIf = node.consequent.body[0];
      const lastElse = node.alternate.body[0];

      if (
        lastIf?.type === 'ExpressionStatement' &&
        lastElse?.type === 'ExpressionStatement' &&
        lastIf.expression.type === 'AssignmentExpression' &&
        lastElse.expression.type === 'AssignmentExpression' &&
        lastIf.expression.left.type === 'Identifier' &&
        lastElse.expression.left.type === 'Identifier' &&
        lastIf.expression.left.name === lastElse.expression.left.name
      ) {
        const target = lastIf.expression.left.name;
        vlog('- Found an if that updates `' + target + '` at the end of both branches');

        // Add to queue in reverse DFS order (we are on the way back here)
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const parentIndex = path.indexes[path.indexes.length - 1];

        // Search for the pattern where an if updates a variable and then uses it in a call expression after the if
        // `if (x) a = 1; else a = 2; f(a);`
        // -> `if (x) f(1); else f(2);`
        const next = parentNode[parentProp][parentIndex + 1];
        const rhsIf = lastIf.expression.right;
        const rhsElse = lastElse.expression.right;
        if (
          // We can only inline the call if the rhs is a simple node
          AST.isComplexNode(rhsIf) ||
          AST.isComplexNode(rhsElse)
        ) {
          vlog('  - The assignments had a complex rhs');
        } else if (
          // And we can only inline if the assigned binding was actually used in the call
          next?.type !== 'ExpressionStatement' ||
          next.expression.type !== 'CallExpression'
        ) {
          vlog('  - The statement after the `if` was not a call', next?.type, next?.expression?.type);
        } else if (
          !(
            (next.expression.callee.type === 'Identifier' && next.expression.callee.name === target) ||
            next.expression.arguments.some((anode) =>
              anode.type === 'SpreadElement'
                ? anode.argument.type === 'Identifier' && anode.argument.name === target
                : anode.type === 'Identifier' && anode.name === target,
            )
          )
        ) {
          vlog('  - The call did not use the binding');
        } else {
          // This call expression used the identifier that was assigned to
          vlog('  - The `if` was followed by a call that uses this binding. Time to hoist!');

          ASSERT(parentIndex >= 0);
          queue.push({ node, rhsIf, rhsElse, target, body: parentNode[parentProp], index: parentIndex });
        }
      }
    }
  }

  if (queue.length) {
    vlog('Found', queue.length, 'if statements that may qualify');
    vgroup('Processing ifs now');
    queue.forEach(({ node, rhsIf, rhsElse, target, body, index }) => {
      vlog('Next if, assigning to:', target);

      rule('An `if` that updates a binding at the end of both branch and which binding is used in a call afterwards can be inlined');
      example('if (x) a = 1; else a = 2; f(a);', 'if (x) { a = 1; f(1); } else { a = 2; f(2); }');
      example('if (x) a = f; else a = g; a();', 'if (x) { a = f; f(); } else { a = g; g(); }');
      before(node, body[index]);

      // - Eliminate the original call
      // - Clone it twice, for each clone:
      //   - Replace usages of the binding name with the a clone of the rhs of the assignment in this branch
      //   - Replace the callee with the rhs if it was the binding
      //   - Push it at the end of the branch. Leave the assignment (other rules will clean up if possible)

      const call = body[index + 1]?.expression;
      ASSERT(call?.type === 'CallExpression', 'checked', call);

      const finalNodeIf = AST.callExpression(
        call.callee.type === 'Identifier' && call.callee.name === target ? AST.cloneSimple(rhsIf) : AST.cloneSimple(call.callee),
        call.arguments.map((anode) =>
          anode.type === 'SpreadElement'
            ? AST.spreadElement(
                AST.cloneSimple(anode.argument.type === 'Identifier' && anode.argument.name === target ? rhsIf : anode.argument),
              )
            : AST.cloneSimple(anode.type === 'Identifier' && anode.name === target ? rhsIf : anode),
        ),
      );

      const finalNodeElse = AST.callExpression(
        call.callee.type === 'Identifier' && call.callee.name === target ? AST.cloneSimple(rhsElse) : AST.cloneSimple(call.callee),
        call.arguments.map((anode) =>
          anode.type === 'SpreadElement'
            ? AST.spreadElement(
                AST.cloneSimple(anode.argument.type === 'Identifier' && anode.argument.name === target ? rhsElse : anode.argument),
              )
            : AST.cloneSimple(anode.type === 'Identifier' && anode.name === target ? rhsElse : anode),
        ),
      );

      node.consequent.body.push(AST.expressionStatement(finalNodeIf));
      node.alternate.body.push(AST.expressionStatement(finalNodeElse));
      body[index + 1] = AST.emptyStatement();

      after(node);
    });
    vgroupEnd();

    log('If-update-calls hoisted:', queue.length, '. Restarting from phase1');
    return 'phase1';
  }

  log('If-update-calls hoisted: 0.');
}
