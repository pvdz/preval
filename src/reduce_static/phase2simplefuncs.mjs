import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { resolveNodeAgainstParams } from '../bindings.mjs';

export function inlineSimpleFuncCalls(fdata) {
  group('\n\n\nChecking for simple func calls that can be inlined');
  const r = _inlineSimpleFuncCalls(fdata);
  groupEnd();
  return r;
}
function _inlineSimpleFuncCalls(fdata) {
  let inlinedFuncCount = 0;
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;

    vgroup('- `' + meta.uniqueName + ':', meta.constValueRef.node.type, ', inlineme?', !!meta.constValueRef.node.$p.inlineMe);

    const funcNode = meta.constValueRef.node;
    if (funcNode.type === 'FunctionExpression') {
      if (funcNode.$p.inlineMe) {
        vgroup('- Searching for all calls to `' + meta.uniqueName + '`');
        const funcBody = funcNode.body.body;
        meta.reads.forEach((read, ri) => {
          vlog('- Read', ri, ':', read.parentNode.type);
          if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
            vlog('Was a call, inlineme?', funcNode.$p.inlineMe ? '"' + funcNode.$p.inlineMe + '"' : '');
            // This read was a call to the function
            switch (funcNode.$p.inlineMe) {
              case 'single return with primitive': {
                rule('Function that only returns primitive must be inlined');
                example('function f() { return 5; } f();', '5;');
                before(funcNode);
                before(read.node, read.blockBody[read.blockIndex]);

                if (read.grandIndex >= 0) {
                  read.grandNode[read.grandProp][read.grandIndex] = AST.cloneSimple(funcBody[funcBody.length - 1].argument);
                } else {
                  read.grandNode[read.grandProp] = AST.cloneSimple(funcBody[funcBody.length - 1].argument);
                }
                ++inlinedFuncCount;

                after(read.parentNode, read.blockBody[read.blockIndex]);
                break;
              }
              case 'single expression statement': {
                //throw 'dead code, but useful';

                // This is an arbitrary expression that we want to inline
                // The expression should be in a normalized state and can be one of a few cases
                // However, this is still a large set and we need to convert every ident that is a
                // parameter into the argument in the same position of that param in this call.
                // An expression can be a simple node, a simple member expression, a unary, a binary,
                // a call, a new expression, an array, object, function, class, or an assignment.
                // Member expressions must be in simple form but can be computed
                // An assignment can have an ident or member expression as the lhs
                // An assignment can have a non-assignment expression of the above kind as the rhs

                // Transforms should respect the normal form so inlining complex expressions will require
                // creating a block and replacing the whole statement containing the function call with a
                // block where the first statement is the expression being inlined and the second statement
                // the thing containing the original call, potentially with the actual call replaced.

                ASSERT(
                  funcBody[funcBody.length - 1]?.type === 'ExpressionStatement',
                  'func must have only an expression statement',
                  funcNode,
                );
                const expr = funcBody[funcBody.length - 1].expression;
                vlog('Expression type:', expr.type, expr.left?.type, expr.right?.type);
                if (expr.type === 'AssignmentExpression') {
                  // TODO: member expressions. can probably do that more efficiently than a clone of the ident branch.

                  // All cases of assignment become a block with the assignment and the statement containing the
                  // original call, with the actual call replaced by undefined. In most cases the original
                  // statement (with the call) ends up being eliminated by other rules.

                  if (expr.left.type === 'Identifier') {
                    const left = expr.left;
                    ASSERT(
                      funcNode.params.every((pnode) => {
                        ASSERT(left.type === 'Identifier', 'normalized code', left);
                        ASSERT(pnode.type === 'Param', 'all params are Params?', pnode);
                        return left.name !== pnode.$p.ref?.name;
                      }),
                      'assignments to params in this case should be caught and eliminated as noops',
                    );

                    const right = expr.right;
                    if (!AST.isComplexNode(right)) {
                      const [resolvedLeft, blockingSpread, paramIndex, isRest] = resolveNodeAgainstParams(right, read.parentNode, funcNode);

                      if (blockingSpread) {
                        vlog(
                          'Cannot inline this call because the call uses a spread that covers the param used in the assignment to inline',
                        );
                      } else {
                        rule('Inlining function that consists of a simple assignment');
                        example(
                          'let x = 1; function f(a, b, ...c) { x = c; } f(1, 2, 3, 4, 5);',
                          'let x = 1; x = [3, 4, 5];',
                          () => isRest,
                        );
                        example(
                          'let x = 1; function f(a, b, ...c) { x = c; } f(1, 2, 3, 4, 5);',
                          'let x = 1; x = [3, 4, 5];',
                          () => !isRest && paramIndex >= 0,
                        );
                        example(
                          'let x = 1; let y = 2; function f() { x = y; } f();',
                          'let x = 1; let y = 2; x = y;',
                          () => right.type === 'Identifier' && paramIndex < 0,
                        );
                        example('let x = 1; function f() { x = 2; } f();', 'let x = 1; x = 2;', () => right.type !== 'Identifier');
                        example(
                          'let x = 1; function f(a, b, ...c) { x = c; } y = f(1, 2, 3, 4, 5);',
                          'let x = 1; { x = [3, 4, 5]; y = undefined; }',
                          () => isRest,
                        );
                        example(
                          'let x = 1; function f(a, b, ...c) { x = c; } const y = f(1, 2, 3, 4, 5);',
                          'let x = 1; { x = [3, 4, 5]; const y = undefined; }',
                          () => isRest,
                        );
                        before(funcNode);
                        before(read.node, read.blockBody[read.blockIndex]);

                        // The assignment becomes its own statement and the original call is replaced with
                        // undefined. We must wrap that in a block to prevent indexes from being shifted.
                        // While this could lead to temporary scoping issues, technically, we will be fine
                        // because at this point we only use unique global identifiers as a guide and the
                        // redundant block will be eliminated later.
                        const finalNode = AST.assignmentExpression(AST.cloneSimple(left), resolvedLeft);
                        const finalParent = AST.blockStatement(AST.expressionStatement(finalNode), read.blockBody[read.blockIndex]);
                        read.blockBody[read.blockIndex] = finalParent;
                        if (read.grandIndex >= 0) {
                          read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
                        } else {
                          read.grandNode[read.grandProp] = AST.identifier('undefined');
                        }
                        ++inlinedFuncCount;

                        after(finalNode, finalParent);
                      }
                      break;
                    } else if (right.type === 'UnaryExpression') {
                      // Right is mostly simple but may be a member expression?
                      if (!AST.isComplexNode(right.argument)) {
                        const [resolvedLeft, blockingSpread, paramIndex, isRest] = resolveNodeAgainstParams(
                          right.argument,
                          read.parentNode,
                          funcNode,
                        );

                        if (blockingSpread) {
                          vlog(
                            'Cannot inline this call because the call uses a spread that covers the param used in the assignment to inline',
                          );
                        } else {
                          const op = right.operator;
                          rule('Inlining function that consists of a simple assignment of a unary expression');
                          example(
                            'let x = 1; function f(a, b, ...c) { x = ' + op + ' c; } f(1, 2, 3, 4, 5);',
                            'let x = 1; { x = ' + op + ' [3, 4, 5]; undefined; }',
                            () => isRest,
                          );
                          example(
                            'let x = 1; function f(a, b, ...c) { x = ' + op + ' b; } f(1, 2, 3, 4, 5);',
                            'let x = 1; { x = ' + op + ' 3; undefined; }',
                            () => !isRest && paramIndex >= 0,
                          );
                          example(
                            'let x = 1; let y = 2; function f() { x = ' + op + ' y; } f();',
                            'let x = 1; let y = 2; { x = ' + op + ' y; undefined; }',
                            () => right.type === 'Identifier' && paramIndex < 0,
                          );
                          example(
                            'let x = 1; function f() { x = ' + op + ' 2; } f();',
                            'let x = 1; { x = ' + op + ' 2; undefined; }',
                            () => right.type !== 'Identifier',
                          );
                          example(
                            'let x = 1; function f(a, b, ...c) { x = ' + op + ' c; } y = f(1, 2, 3, 4, 5);',
                            'let x = 1; { x = ' + op + ' [3, 4, 5]; y = undefined; }',
                            () => isRest,
                          );
                          example(
                            'let x = 1; function f(a, b, ...c) { x = ' + op + ' c; } const y = f(1, 2, 3, 4, 5);',
                            'let x = 1; { x = ' + op + ' [3, 4, 5]; const y = undefined; }',
                            () => isRest,
                          );
                          before(funcNode);
                          before(read.node, read.blockBody[read.blockIndex]);

                          // The assignment becomes its own statement and the original call is replaced with
                          // undefined. We must wrap that in a block to prevent indexes from being shifted.
                          // While this could lead to temporary scoping issues, technically, we will be fine
                          // because at this point we only use unique global identifiers as a guide and the
                          // redundant block will be eliminated later.
                          const finalNode = AST.assignmentExpression(AST.cloneSimple(left), AST.unaryExpression(op, resolvedLeft));
                          const finalParent = AST.blockStatement(AST.expressionStatement(finalNode), read.blockBody[read.blockIndex]);
                          read.blockBody[read.blockIndex] = finalParent;
                          if (read.grandIndex >= 0) {
                            read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
                          } else {
                            read.grandNode[read.grandProp] = AST.identifier('undefined');
                          }
                          ++inlinedFuncCount;

                          after(finalNode, finalParent);
                        }
                        break;
                      }
                    } else if (right.type === 'BinaryExpression') {
                      const lhs = right.left;
                      const rhs = right.right;
                      if (!AST.isComplexNode(lhs) && !AST.isComplexNode(rhs)) {
                        const [resolvedLeft, blockingSpread, paramIndex, isRest] = resolveNodeAgainstParams(lhs, read.parentNode, funcNode);
                        const [resolvedLeft2, blockingSpread2, paramIndex2, isRest2] = resolveNodeAgainstParams(
                          rhs,
                          read.parentNode,
                          funcNode,
                        );

                        if (blockingSpread || blockingSpread2) {
                          vlog(
                            'Cannot inline this call because the call uses a spread that covers the param used in the assignment to inline',
                          );
                        } else {
                          const op = right.operator;
                          rule('Inlining function that consists of a simple assignment of a binary expression');
                          example(
                            'let x = 1; function f(a, b) { x = a ' + op + ' 2; } f(1, 2, 3, 4, 5);',
                            'let x = 1; { x = 1 ' + op + ' 2; undefined; }',
                          );
                          example(
                            'let x = 1; function f(a, b) { x = a ' + op + ' 2; } y = f(1, 2, 3, 4, 5);',
                            'let x = 1; { x = 1 ' + op + ' 2; y = undefined; }',
                          );
                          example(
                            'let x = 1; function f(a, b) { x = a ' + op + ' 2; } const y = f(1, 2, 3, 4, 5);',
                            'let x = 1; { x = 1 ' + op + ' 2; const y = undefined; }',
                          );
                          before(funcNode);
                          before(read.node, read.blockBody[read.blockIndex]);

                          // The assignment becomes its own statement and the original call is replaced with
                          // undefined. We must wrap that in a block to prevent indexes from being shifted.
                          // While this could lead to temporary scoping issues, technically, we will be fine
                          // because at this point we only use unique global identifiers as a guide and the
                          // redundant block will be eliminated later.
                          const finalNode = AST.assignmentExpression(
                            AST.cloneSimple(left),
                            AST.binaryExpression(op, resolvedLeft, resolvedLeft2),
                          );
                          const finalParent = AST.blockStatement(AST.expressionStatement(finalNode), read.blockBody[read.blockIndex]);
                          read.blockBody[read.blockIndex] = finalParent;
                          if (read.grandIndex >= 0) {
                            read.grandNode[read.grandProp][read.grandIndex] = AST.identifier('undefined');
                          } else {
                            read.grandNode[read.grandProp] = AST.identifier('undefined');
                          }
                          ++inlinedFuncCount;

                          after(finalNode, finalParent);
                        }
                        break;
                      }
                    }
                    // Meh.
                    //else if (right.type === 'ArrayExpression') {
                    //} else if (right.type === 'ObjectExpression') {
                    //}
                    // else FunctionExpression, ArrayFunctionExpression, ClassExpression
                  }
                }

                break;
              }
              case 'double with primitive': {
                rule('Function that returns local primitive should be inlined');
                example('function f() { const x = undefined; return x; } f();', 'undefined;');
                before(funcNode);
                before(read.node, read.blockBody[read.blockIndex]);

                const bodyOffset = findBodyOffset(funcNode);
                if (read.grandIndex >= 0) {
                  read.grandNode[read.grandProp][read.grandIndex] = funcBody[bodyOffset].declarations[0].init;
                } else {
                  read.grandNode[read.grandProp] = funcBody[bodyOffset].declarations[0].init;
                }
                ++inlinedFuncCount;

                after(read.parentNode, read.blockBody[read.blockIndex]);
                break;
              }
              case 'double with array with primitives': {
                rule('Function that returns array literal with only primitives should be inlined');
                example('function f() { const arr = [1, 2]; return arr; } f();', '[1, 2];');
                before(funcNode);
                before(read.node, read.blockBody[read.blockIndex]);

                const bodyOffset = findBodyOffset(funcNode);
                if (read.grandIndex >= 0) {
                  read.grandNode[read.grandProp][read.grandIndex] = funcBody[bodyOffset].declarations[0].init;
                } else {
                  read.grandNode[read.grandProp] = funcBody[bodyOffset].declarations[0].init;
                }
                ++inlinedFuncCount;

                after(read.parentNode, read.blockBody[read.blockIndex]);
                break;
              }
              case 'double with identifier': {
                const bodyOffset = findBodyOffset(funcNode);
                const ident = funcBody[bodyOffset].declarations[0].init;
                const [resolvedLeft, blockingSpread, paramIndex, isRest] = resolveNodeAgainstParams(ident, read.parentNode, funcNode);

                vlog(paramIndex >= 0 ? 'Using param index ' + paramIndex : 'Not using param');
                vlog('Call site using a spread we cant handle?', blockingSpread);

                if (blockingSpread) {
                  vlog('- Call is using spread before or at the param index so we must bail');
                } else if (paramIndex >= 0) {
                  // Must verify whether the ident is a param, and if so, that it's eligible for replacement,
                  // and if so, replace all call sites with the argument at that position. If not param, just keep it.
                  rule('Function that returns local binding set to an identifier should be inlined');
                  example('function f(a) { const x = a; return x; } f(1);', '1;');
                  before(funcNode);
                  before(read.node, read.blockBody[read.blockIndex]);

                  if (read.grandIndex >= 0) {
                    read.grandNode[read.grandProp][read.grandIndex] = resolvedLeft;
                  } else {
                    read.grandNode[read.grandProp] = resolvedLeft;
                  }
                  ++inlinedFuncCount;

                  after(read.parentNode, read.blockBody[read.blockIndex]);
                  break;
                }
              }
            }
          }
        });

        vgroupEnd();
      }
    }
    vgroupEnd();
  });

  if (inlinedFuncCount > 0) {
    log('Inlined function calls:', inlinedFuncCount, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }

  log('Inlined function calls: 0.');
}
