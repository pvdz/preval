// Find the pattern of updating a binding at the end of both branches of an `if` statement, followed by a call using that binding.
//
//        if (a) x = 1; else x = 2; f(x)
// ->
//        if (a) f(1); else f(2);

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
  group('\n\n\n[ifUpdateCall] Finding if-update-call patterns to replace\n');
  //currentState(fdata, 'ifUpdateCall'. true, fdata);
  const r = _ifUpdateCall(fdata);
  groupEnd();
  return r;
}
function _ifUpdateCall(fdata) {
  const queue = [];
  const ast = fdata.tenkoOutput.ast;

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;

    if (!node.$p.alwaysCompletes?.size) {
      const lastIf = node.consequent.body[node.consequent.body.length - 1];
      const lastElse = node.alternate.body[node.alternate.body.length - 1];

      vlog('Last statement in the `then`:', lastIf?.type, ', last statement in the `else`:', lastElse?.type);

      if (
        (!lastElse ||
          (lastElse?.type === 'ExpressionStatement' &&
            lastElse.expression.type === 'AssignmentExpression' &&
            lastElse.expression.left.type === 'Identifier')) &&
        (!lastIf ||
          (lastIf?.type === 'ExpressionStatement' &&
            lastIf.expression.type === 'AssignmentExpression' &&
            lastIf.expression.left.type === 'Identifier')) &&
        (lastIf || lastElse)
      ) {
        const targetNameThen = lastIf?.expression.left.name ?? '';
        const targetNameElse = lastElse?.expression.left.name ?? '';
        vlog(
          '- Found an if that updates `' +
            targetNameThen +
            '`' +
            (targetNameElse ? ' and `' + targetNameElse + '`' : '') +
            ' at the end of at least one branch',
        );

        // Add to queue in reverse DFS order (we are on the way back here)
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const parentIndex = path.indexes[path.indexes.length - 1];

        // Search for the pattern where an if updates a variable and then uses it in a call expression after the if
        // `if (x) a = 1; else a = 2; f(a);`
        // -> `if (x) f(1); else f(2);`
        const next = parentNode[parentProp][parentIndex + 1];
        const rhsIf = lastIf?.expression.right;
        const rhsElse = lastElse?.expression.right;

        if (
          // And we can only inline if the assigned binding was actually used in the call
          next?.type === 'ExpressionStatement' &&
          next.expression.type === 'CallExpression'
        ) {
          if (
            !(
              (next.expression.callee.type === 'Identifier' &&
                (next.expression.callee.name === targetNameThen || next.expression.callee.name === targetNameElse)) ||
              next.expression.arguments.some((anode) =>
                anode.type === 'SpreadElement'
                  ? anode.argument.type === 'Identifier' &&
                    (anode.argument.name === targetNameThen || anode.argument.name === targetNameElse)
                  : anode.type === 'Identifier' && (anode.name === targetNameThen || anode.name === targetNameElse),
              )
            )
          ) {
            vlog('  - The call did not use the binding');
          } else {
            // This call expression used the identifier that was assigned to
            vlog('  - The `if` was followed by a call that uses this binding. Time to hoist!');

            ASSERT(parentIndex >= 0);
            queue.push({
              what: 'call',
              node,
              rhsIf,
              rhsElse,
              id2: undefined,
              init: undefined,
              body: parentNode[parentProp],
              index: parentIndex,
            });
          }
        } else if (next?.type === 'VarStatement') {
          const { id: id2, init: init2 } = next;
          vlog('Followed by var decl on `' + id2.name + '`');
          if (init2.type === 'Identifier' && (init2.name === targetNameThen || init2.name === targetNameElse)) {
            // Should be okay to go here.
            queue.push({
              what: 'var',
              node,
              rhsIf,
              rhsElse,
              id2: id2.name,
              init: init2,
              body: parentNode[parentProp],
              index: parentIndex,
            });
          } else if (
            init2.type === 'UnaryExpression' &&
            init2.argument.type === 'Identifier' &&
            (init2.argument.name === targetNameThen || init2.argument.name === targetNameElse)
          ) {
            // Should be okay to go here.
            queue.push({
              what: 'var',
              node,
              rhsIf,
              rhsElse,
              id2: id2.name,
              init: init2,
              body: parentNode[parentProp],
              index: parentIndex,
            });
          } else if (
            init2.type === 'BinaryExpression' &&
            init2.left.type === 'Identifier' &&
            (init2.left.name === targetNameThen || init2.left.name === targetNameElse)
          ) {
            // Should be okay to go here.
            queue.push({
              what: 'var',
              node,
              rhsIf,
              rhsElse,
              id2: id2.name,
              init: init2,
              body: parentNode[parentProp],
              index: parentIndex,
            });
          } else if (
            init2.type === 'BinaryExpression' &&
            init2.right.type === 'Identifier' &&
            (init2.right.name === targetNameThen || init2.right.name === targetNameElse)
          ) {
            // Should be okay to go here.
            queue.push({
              what: 'var',
              node,
              rhsIf,
              rhsElse,
              id2: id2.name,
              init: init2,
              body: parentNode[parentProp],
              index: parentIndex,
            });
          } else if (
            init2.type === 'CallExpression' &&
            ((init2.callee.type === 'Identifier' && (init2.callee.name === targetNameThen || init2.callee.name === targetNameElse)) ||
              init2.arguments.some((anode) =>
                anode.type === 'SpreadElement'
                  ? anode.argument.type === 'Identifier' &&
                    (anode.argument.name === targetNameThen || anode.argument.name === targetNameElse)
                  : anode.type === 'Identifier' && (anode.name === targetNameThen || anode.name === targetNameElse),
              ))
          ) {
            // Should be okay to go here.
            queue.push({
              what: 'var',
              node,
              rhsIf,
              rhsElse,
              id2: id2.name,
              init: init2,
              body: parentNode[parentProp],
              index: parentIndex,
            });
          } else if (
            init2.type === 'TemplateLiteral' &&
            init2.expressions.some((e) => e.type === 'Identifier' && (e.name === targetNameThen || e.name === targetNameElse))
          ) {
            // Should be okay to go here.
            queue.push({
              what: 'var',
              node,
              rhsIf,
              rhsElse,
              id2: id2.name,
              init: init2,
              body: parentNode[parentProp],
              index: parentIndex,
            });
          } else {
            vlog(
              'The binding init did not use the `' +
                targetNameThen +
                '`' +
                (targetNameElse ? ' nor the `' + targetNameElse + '`' : '') +
                ' ident or it was not a type that is supported here (`' +
                init2.type +
                '`)',
            );
          }
        } else {
          vlog('  - The statement after the `if` was not a call', next?.type, next?.expression?.type);
        }
      }
    }
  }

  if (queue.length) {
    vlog('Found', queue.length, 'if statements that may qualify');
    vgroup('Processing ifs now');
    queue.sort(({ index: a }, { index: b }) => b - a);

    queue.forEach(({ what, node: ifNode, rhsIf, rhsElse, id2, init, body, index }) => {
      if (what === 'call') {
        vlog('For a call...');

        rule('An `if` that updates a binding at the end of both branch and which binding is used in a call afterwards can be inlined');
        example('if (x) a = 1; else a = 2; f(a);', 'if (x) { a = 1; f(a); } else { a = 2; f(a); }', () => !rhsIf || !rhsElse);
        before(ifNode, body[index]);

        const call = body[index + 1]?.expression;
        ASSERT(call?.type === 'CallExpression', 'checked', body[index + 1]);

        ifNode.consequent.body.push(
          AST.expressionStatement(
            AST.callExpression(
              AST.cloneSimple(call.callee),
              call.arguments.map((anode) =>
                anode.type === 'SpreadElement' ? AST.spreadElement(AST.cloneSimple(anode.argument)) : AST.cloneSimple(anode),
              ),
            ),
          ),
        );
        ifNode.alternate.body.push(
          AST.expressionStatement(
            AST.callExpression(
              AST.cloneSimple(call.callee),
              call.arguments.map((anode) =>
                anode.type === 'SpreadElement' ? AST.spreadElement(AST.cloneSimple(anode.argument)) : AST.cloneSimple(anode),
              ),
            ),
          ),
        );
        body[index + 1] = AST.emptyStatement();

        after(ifNode);
      } else if (what === 'var') {
        vlog('For a var...');

        rule('A binding decl that follows an if that updates its init can be inlined');
        example('if (x) a = 1; else a = 2; const y = a;', 'let y; if (x) { a = 1; y = a; } else { a = 2; y = a; }', () => rhsIf && rhsElse);
        example('if (x) {} else a = 2; const y = a;', 'let y; if (x) { y = a; } else { a = 2; y = a; }', () => !rhsIf || !rhsElse);
        before(body[index]);
        before(init);

        let finalNode1;
        let finalNode2;
        switch (init.type) {
          case 'Identifier': {
            finalNode1 = AST.cloneSimple(init);
            finalNode2 = AST.cloneSimple(init);
            break;
          }
          case 'UnaryExpression': {
            finalNode1 = AST.unaryExpression(init.operator, AST.cloneSimple(init.argument));
            finalNode2 = AST.unaryExpression(init.operator, AST.cloneSimple(init.argument));
            break;
          }
          case 'BinaryExpression': {
            finalNode1 = AST.binaryExpression(init.operator, AST.cloneSimple(init.left), AST.cloneSimple(init.right));
            finalNode2 = AST.binaryExpression(init.operator, AST.cloneSimple(init.left), AST.cloneSimple(init.right));
            break;
          }
          case 'TemplateLiteral': {
            finalNode1 = AST.cloneSimpleOrTemplate(init);
            finalNode2 = AST.cloneSimpleOrTemplate(init);
            break;
          }
          case 'CallExpression': {
            finalNode1 = AST.callExpression(
              AST.cloneSimple(init.callee),
              init.arguments.map((e) => AST.cloneSimple(e)),
            );
            finalNode2 = AST.callExpression(
              AST.cloneSimple(init.callee),
              init.arguments.map((e) => AST.cloneSimple(e)),
            );
            break;
          }
          default: {
            ASSERT(false);
          }
        }

        body[index + 1] = AST.emptyStatement();
        body.splice(index, 0, AST.varStatement('let', id2, AST.undef()));
        ifNode.consequent.body.push(AST.expressionStatement(AST.assignmentExpression(id2, finalNode1, '=')));
        ifNode.alternate.body.push(AST.expressionStatement(AST.assignmentExpression(id2, finalNode2, '=')));

        after(body[index]);
        after(ifNode);
      } else {
        ASSERT(false, 'wat?', what);
      }
    });
    vgroupEnd();

    log('If-update-calls hoisted:', queue.length, '. Restarting from phase1');
    return {what: 'ifUpdateCall', changes: queue.length, next: 'phase1'};
  }

  log('If-update-calls hoisted: 0.');
}
