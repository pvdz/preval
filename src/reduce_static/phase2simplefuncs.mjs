import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { isComplexNode } from '../ast.mjs';

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

    vgroup(
      '-',
      meta.name,
      ', constant?',
      meta.isConstant,
      ', constValueRef?',
      meta.constValueRef?.node.type,
      ', inlineme?',
      !!meta.constValueRef?.node.$p.inlineMe,
    );
    if (meta.isConstant && meta.constValueRef) {
      ASSERT(meta.writes.length === 1);
      const funcNode = meta.constValueRef.node;
      if ((funcNode.type === 'FunctionExpression' || funcNode.type === 'ArrowFunctionExpression') && funcNode.$p.inlineMe) {
        vgroup('- Searching for all calls to `' + meta.name + '`');
        meta.reads.forEach((read, ri) => {
          vlog('- Read', ri, ':', read.parentNode.type);
          if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
            vlog('Was a call, inlineme?', funcNode.$p.inlineMe ? '"' + funcNode.$p.inlineMe + '"' : '');
            // This read was a call to the function
            switch (funcNode.$p.inlineMe) {
              case 'single return with primitive': {
                rule('Function that only returns primitive must be inlined');
                example('function f() { return 5; } f();', '5;');
                before(read.node, read.parentNode);

                if (read.grandIndex >= 0) {
                  read.grandNode[read.grandProp][read.grandIndex] = AST.cloneSimple(funcNode.body.body[0].argument);
                } else {
                  read.grandNode[read.grandProp] = AST.cloneSimple(funcNode.body.body[0].argument);
                }
                ++inlinedFuncCount;

                after(read.parentNode);
                break;
              }
              case 'single expression statement': {
                // This is an arbitrary expression that we want to inline
                // The expression should be normalized and can be one of a few cases
                // However, this is still a large set and we need to convert every ident that is a
                // parameter into the argument in the same position of that param in this call.
                // An expression can be a simple node, a simple member expression, a unary, a binary,
                // a call, a new expression, an array, object, function, class, or an assignment.
                // Member expressions must be in simple form but can be computed
                // An assignment can have an ident or member expression as the lhs
                // An assignment can have a non-assignment expression of the above kind as the rhs

                ASSERT(
                  funcNode.body.body.length === 1 && funcNode.body.body[0].type === 'ExpressionStatement',
                  'func must have only an expression statement',
                  funcNode,
                );
                const expr = funcNode.body.body[0].expression;
                vlog('Expression type:', expr.type, expr.left?.type, expr.right?.type);
                if (expr.type === 'AssignmentExpression') {
                  // TODO: member expressions. can probably do that more efficiently than a clone of the ident branch.
                  if (expr.left.type === 'Identifier') {
                    const left = expr.left;
                    ASSERT(
                      !funcNode.params.some((pnode) => left.name === (pnode.type === 'RestElement' ? pnode.argument.name : pnode.name)),
                      'assignments to params in this case should be caught and eliminated as noops',
                    );

                    const right = expr.right;
                    if (!isComplexNode(right)) {
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
                        before(read.node);

                        const finalNode = AST.assignmentExpression(AST.cloneSimple(left), resolvedLeft);
                        if (read.grandIndex >= 0) {
                          read.grandNode[read.grandProp][read.grandIndex] = finalNode;
                        } else {
                          read.grandNode[read.grandProp] = finalNode;
                        }
                        ++inlinedFuncCount;

                        after(finalNode);
                      }
                      break;
                    } else if (right.type === 'UnaryExpression') {
                      // Right is mostly simple but may be a member expression?
                      if (!isComplexNode(right.argument)) {
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
                            'let x = 1; x = ' + op + ' [3, 4, 5];',
                            () => isRest,
                          );
                          example(
                            'let x = 1; function f(a, b, ...c) { x = ' + op + ' b; } f(1, 2, 3, 4, 5);',
                            'let x = 1; x = ' + op + ' 3;',
                            () => !isRest && paramIndex >= 0,
                          );
                          example(
                            'let x = 1; let y = 2; function f() { x = ' + op + ' y; } f();',
                            'let x = 1; let y = 2; x = ' + op + ' y;',
                            () => right.type === 'Identifier' && paramIndex < 0,
                          );
                          example(
                            'let x = 1; function f() { x = ' + op + ' 2; } f();',
                            'let x = 1; x = ' + op + ' 2;',
                            () => right.type !== 'Identifier',
                          );
                          before(read.node);

                          const finalNode = AST.assignmentExpression(AST.cloneSimple(left), AST.unaryExpression(op, resolvedLeft));
                          if (read.grandIndex >= 0) {
                            read.grandNode[read.grandProp][read.grandIndex] = finalNode;
                          } else {
                            read.grandNode[read.grandProp] = finalNode;
                          }
                          ++inlinedFuncCount;

                          after(finalNode);
                        }
                        break;
                      }
                    } else if (right.type === 'BinaryExpression') {
                      const lhs = right.left;
                      const rhs = right.right;
                      if (!isComplexNode(lhs) && !isComplexNode(rhs)) {
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
                          rule('Inlining function that consists of a simple assignment of a unary expression');
                          example(
                            'let x = 1; function f(a, b) { x = a ' + op + ' 2; } f(1, 2, 3, 4, 5);',
                            'let x = 1; x = 1 ' + op + ' 2;',
                          );
                          before(read.node);

                          const finalNode = AST.assignmentExpression(
                            AST.cloneSimple(left),
                            AST.binaryExpression(op, resolvedLeft, resolvedLeft2),
                          );
                          if (read.grandIndex >= 0) {
                            read.grandNode[read.grandProp][read.grandIndex] = finalNode;
                          } else {
                            read.grandNode[read.grandProp] = finalNode;
                          }
                          ++inlinedFuncCount;

                          after(finalNode);
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
                before(read.node, read.parentNode);

                if (read.grandIndex >= 0) {
                  read.grandNode[read.grandProp][read.grandIndex] = funcNode.body.body[0].declarations[0].init;
                } else {
                  read.grandNode[read.grandProp] = funcNode.body.body[0].declarations[0].init;
                }
                ++inlinedFuncCount;

                after(read.parentNode);
                break;
              }
              case 'double with array with primitives': {
                rule('Function that returns array literal with only primitives should be inlined');
                example('function f() { const arr = [1, 2]; return arr; } f();', '[1, 2];');
                before(read.node, read.parentNode);

                if (read.grandIndex >= 0) {
                  read.grandNode[read.grandProp][read.grandIndex] = funcNode.body.body[0].declarations[0].init;
                } else {
                  read.grandNode[read.grandProp] = funcNode.body.body[0].declarations[0].init;
                }
                ++inlinedFuncCount;

                after(read.parentNode);
                break;
              }
              case 'double with identifier': {
                // The
                const ident = funcNode.body.body[0].declarations[0].init;
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
                  before(read.node, read.parentNode);

                  if (read.grandIndex >= 0) {
                    read.grandNode[read.grandProp][read.grandIndex] = resolvedLeft;
                  } else {
                    read.grandNode[read.grandProp] = resolvedLeft;
                  }
                  ++inlinedFuncCount;

                  after(read.parentNode);
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
  log('Inlined', inlinedFuncCount, 'function calls.');
  if (inlinedFuncCount > 0) {
    log('Restarting from phase1 to fix up read/write registry\n\n\n\n\n\n');
    return 'phase1';
  }
  log('\n\n\n\n\n\n');
}

function resolveNodeAgainstParams(node, callNode, funcNode) {
  // If given node is an identifier, check if it's a parameter of given function node.
  // If it is, resolve the argument at the same index of the parameter being referenced.
  // If rest, attempt to resolve this in a special way.
  // If node is a literal, or the identifier is a builtin or something, just keep it as is.
  // The returned node should be cloned / fresh.
  // If spread/rest problems block the transform then the returned node will be null.

  if (node.type === 'Identifier') {
    ASSERT(callNode.type === 'CallExpression');
    ASSERT(funcNode.type === 'FunctionExpression' || funcNode.type === 'ArrowFunctionExpression');

    const name = node.name;
    let paramIndex = -1;
    let isRest = false; // Special care for the rest param
    funcNode.params.some((pnode, pi) => {
      if (pnode.type === 'RestElement') {
        if (name === pnode.argument.name) {
          isRest = true;
          paramIndex = pi;
          return true;
        }
      }
      if (name === pnode.name) {
        paramIndex = pi;
        return true;
      }
    });

    if (paramIndex < 0) {
      //// In this case we don't care about rest/spread args. They are unused.
      //rule('Assignment of param to closure as only statement in function should be outlined');
      //example('let x = 1; let y = 2; function f() { x = y; } f();', 'let x = 1; let y = 2; x = y;');
      //before(read.node);

      return [AST.cloneSimple(node), false, paramIndex, isRest];
    }

    // Verify whether the call uses a spread before the paramIndex. If so we must bail here.

    const args = callNode['arguments'];
    let blockingSpread = false;
    args.some((anode, ai) => {
      if (isRest && ai === paramIndex) {
        return true; // Spread can cover this
      }
      if (anode.type === 'SpreadElement') {
        blockingSpread = true;
        return true;
      }
      if (ai === paramIndex) {
        return true;
      }
    });

    if (blockingSpread) {
      vlog('Cannot inline this call because the call uses a spread that covers the param used in the assignment to inline');
      return [null, true, paramIndex, isRest];
    }

    if (isRest) {
      // This ident is the rest param. We can hack something together to make this work. Pretty specific case tho.
      //rule('Assignment of rest param to closure as only statement in function should be outlined');
      //example('let x = 1; function f(a, b, ...c) { x = c; } f(1, 2, 3, 4, 5);', 'let x = 1; x = [3, 4, 5];');
      //before(read.node);

      return [
        AST.arrayExpression(
          // Note: all args must be simple although some may be spread they must still be simple too
          args.slice(paramIndex).map((anode) => {
            if (anode.type === 'SpreadElement') {
              return AST.spreadElement(AST.cloneSimple(anode.argument));
            }
            return AST.cloneSimple(anode);
          }),
        ),
        false,
        paramIndex,
        true,
      ];
    }

    // The function contained an assignment that uses a param that is not a rest
    // The call did not have a spread before or on the index of the used param
    //rule('Assignment of param to closure as only statement in function should be outlined');
    //example('let x = 1; function f(a, b) { x = b; } f(1, 2);', 'let x = 1; x = 2;');
    //before(read.node);

    return [AST.cloneSimple(args[paramIndex] || AST.identifier('undefined')), false, paramIndex, false];
  }

  return [AST.cloneSimple(node), false, -1, false];
}
