// If a function only gets called and the first statement mutates an arg in a static way then we can outline this operation
// `function f(a) { const x = a + 1; return a; } f(1); f(2);`
// -> `function f(a) { const x = a; return a; } f(1 + 1); f(2 + 1);`

// TODO: Bonus points if the op regards two args rather than a literal
// TODO: Bonus points for outlining assignments to closures in the same way

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
  coerce,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function staticArgOpOutlining(fdata) {
  group('\n\n\nFinding static param ops to outline\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _staticArgOpOutlining(fdata);
  groupEnd();
  return r;
}
function _staticArgOpOutlining(fdata) {
  let changes = 0;
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return; // I don't think this really matters. But perhaps in that case we should just skip the lets...
    if (meta.constValueRef.node.type !== 'FunctionExpression') return;

    vgroup('-', name);
    process(meta, name);
    vgroupEnd();
  });

  const FAIL = 0;
  const PASS = 1;
  const SKIP = 2;

  function actionableValue(node, names) {
    // This should be the init of the var or rhs of the assign (or unary/binary as statement...)
    // The return value should indicate whether this is the needle (expression that contains a param and is
    // otherwise static) or an expression that has no side effects and is safe to scan past (like an
    // assignment of primitive or function or smth).

    if (AST.isPrimitive(node.type)) {
      // `5` is skippable
      return SKIP;
    } else if (node.type === 'BinaryExpression') {
      // Good if at least left or right is a param and the other is a param or primitive
      // Skippable if the expression is a primitive, function expression, or class/array/object with all internals skippable too

      let params = 0;
      if (AST.isPrimitive(node.left)) {
      } else if (node.left.type === 'Identifier') {
        const paramIndex = names.indexOf(node.left.name);
        if (paramIndex < 0) {
          vlog('- The lhs was not a param, bailing');
          return FAIL;
        }
        params = PASS;
      } else {
        vlog('- Left is neither primitive nor param, bailing');
      }
      if (AST.isPrimitive(node.right)) {
      } else if (node.right.type === 'Identifier') {
        const paramIndex = names.indexOf(node.right.name);
        if (paramIndex < 0) {
          // Must bail because x+y _may_ spy and change something on the caller side.
          vlog('- The rhs was not a param, bailing');
          return FAIL;
        }
        params = true;
      } else {
        vlog('- Right is neither primitive nor param, bailing');
        return FAIL;
      }
      if (!params) {
        // Even though normalization would take care of it, there's no reason why we wouldn't just skip it here.
        // `x = 1 + 2` is skippable
        return SKIP;
      }
      if (params !== 1) {
        // TODO: I think we can support this but double ident is dangerous because they may be two spies and you would need to make sure they proc in the proper order (that's the order here)
        return FAIL;
      }
      // So this must (currently) be ident + primitive, or primitive + ident.
      return PASS;
    } else if (node.type === 'UnaryExpression') {
      if (AST.isPrimitive(node.argument)) {
        // `x = ~1` is skippable
        return PASS;
      }
      if (node.argument.type !== 'Identifier') {
        // Normalized code so I'm not even sure what it may still be if not primitive or ident, but whatever.
        vlog('- Unary arg is not an ident, bailing');
        return FAIL;
      }
      const paramIndex = names.indexOf(node.argument.name);
      if (paramIndex < 0) {
        // Not even `!` is safe here since if the arg is a spy, it may be changed by this transform (`x = !spy; y = spy_as_parma + 1`)
        vlog('- The arg was not a param, bailing');
        return FAIL;
      }
      return PASS;
    } else if (node.type === 'Identifier') {
      const paramIndex = names.indexOf(node.name);
      if (paramIndex < 0) {
        // Let's say the value concerns a spy
        // The problematic case would be this:
        // `function f(a) { x = spy; y = a + 1; } f(spy);` ->
        // `function f(a) { x = spy; y = a + 1; } let y = spy + 1; f(spy, y);`
        // So either way, the value of the original param is the spy itself and the alias to y does not change this. So we're good to skip.
        return SKIP;
      }
      return PASS;
    } else if (['FunctionExpression', 'ArrayExpression', 'ObjectExpression', 'ClassExpression'].includes(node.type)) {
      // `x = function(){};` is not observable
      // Same for class/array/object but only if the same applies to any of their internal bits.
      // Since they are normalized, they should not contain bits that can be observable when read...
      return SKIP;
    } else {
      return FAIL;
    }
  }
  function actionable(node, names) {
    let expr;
    switch (node.type) {
      case 'VariableDeclaration': {
        return actionableValue(node.declarations[0].init, names);
      }
      case 'ExpressionStatement': {
        const r = actionableValue(node.expression, names);
        if (node.expression.type === 'AssignmentExpression' && r) {
          // The assignment may be dangerious if the result is SKIP
          return FAIL;
        }
        return r;
      }
      default:
        return FAIL;
    }
  }

  function process(meta, name) {
    // Verify that
    // - The function is only called, doesn't escape
    // - The function has at least one arg
    // - The function has some kind of expression in the first statement that uses an arg
    // - None of the calls use a spread (and later we can still proceed if the param is before the spread in all calls)
    // - The function is not direct recursive (tests/cases/primitive_arg_inlining/recursion/_base.md). Probably also not indirectly recursive (?)

    const funcNode = meta.constValueRef.node;
    const paramCount = funcNode.params.length;
    if (paramCount === 0) {
      vlog('- Function has no params, bailing');
      return;
    }

    if (funcNode.$p.readsArgumentsLen || funcNode.$p.readsArgumentsAny) {
      vlog('- The function uses `arguments` so we should bail');
      return;
    }

    if (
      meta.reads.some((read) => {
        if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
          vlog('- The function escapes (at least one read was not a call), bailing');
          return true;
        }

        if (read.parentNode['arguments'].some((anode) => anode.type === 'SpreadElement')) {
          // TODO: we can still do this for any params that occur before any spread in all calls
          vlog('- The function was called with a spread at least once, bailing');
          return true;
        }

        if (read.pfuncNode === funcNode) {
          vlog('- This is a recursive function. It is too dangerous.');
          return true;
        }
      })
    ) {
      return;
    }

    // Find the first statement of the function and check if it uses an arg.
    // TODO: in certain cases we can skip statements (ones that can't possibly spy) to try the next statement.

    ASSERT(funcNode.body.body[funcNode.$p.bodyOffset - 1]?.type === 'DebuggerStatement', 'The body offset should not be stale');
    const stmt = funcNode.body.body[funcNode.$p.bodyOffset];
    ASSERT(stmt, 'normalized funcs must at least have a return statement...');
    // Interesting stuff to check: unary expression, binary expression, call expression, new expression, more?
    // These can appear as one of the three expression forms; var, statement, or assignment.

    const action = actionable(stmt, funcNode.$p.paramNames);

    let expr;
    if (stmt.type === 'VariableDeclaration') {
      expr = stmt.declarations[0].init;
    } else if (stmt.type === 'ExpressionStatement') {
      if (stmt.expression.type === 'AssignmentExpression') {
        expr = stmt.expression.right;
      } else {
        expr = stmt.expression;
      }
    } else {
      vlog('- The statement was not in an expression form (', stmt.type, 'is not a var or expr stmt), bailing');
      return;
    }

    const names = funcNode.$p.paramNames;

    if (expr.type === 'BinaryExpression') {
      // Determine whether one side is using an arg
      // `function f(a) { const x = a + 1; }`
      // `function f(a) { const x = 1 + a; }`

      if (expr.left.type === 'Identifier') {
        const paramIndex = names.indexOf(expr.left.name);
        if (paramIndex < 0) {
          vlog('- The lhs was not a param, bailing');
          return;
        }

        if (funcNode.params[paramIndex].rest) {
          vlog('- The target param is a rest param, bailing');
          return;
        }

        if (!AST.isPrimitive(expr.right)) {
          vlog('- The lhs was a param but the rhs was not a primitive, bailing (for now)');
          return;
        }

        // The param should only have one read (for now, TODO: we can probably support a few more cases but we have to make sure all the usages are okay with the updated value)
        const pmeta = fdata.globallyUniqueNamingRegistry.get(expr.left.name);
        // If the param is read more than once we'll need to create a new param for it instead
        const multi = pmeta.reads.length > 1;

        // So this function is called in all reads, uses a param in a binary expression in its first statement, and this
        // binary expression also has a primitive to the other side. Looks like we can outline it.

        if (multi) {
          // Since the param is used more than once, we'll need to add a fresh param to cover this
          // That should be safe. The function doesn't currently use `arguments` so the only risk is
          // code bloat. If that does become a problem then we can curb that by limiting the param
          // count for this trick.

          rule(
            'Part 1: When a function is only called and uses a param in its first statement then we can outline this expression; binary rhs multi-use',
          );
          example(
            'function f(a) { const x = a + 1; g(a); return x; } f(1); f("a");',
            'function f(a, b) { const x = b; g(a); return x; } f(1, 1 + 1); f("a" + 1);',
          );
          before(meta.constValueRef.containerNode);
          meta.reads.forEach((read) => before(read.parentNode));

          // We create a fresh param name and add it to the end
          // We replace the binary expression with the new param name
          // For all calls we create a local var with the binary expression of the arg at that position and the binary expression
          // To each call we append a new arg which is the new binding name
          // Must be careful with spreads, rest, and missing arguments (or do we guarantee those in normalized state? I don't think we can?)
          // But we've already verified that spreads did not occur, we ignore rest for now, and assume missing args always exist.
          // TODO: if the param concerns a rest we should bail
          // TODO: not sure if we should do it here but if it reaches here with a rest param then we can eliminate this rest statically

          const paramName = '$$' + paramCount;
          const paramNode = AST.param('$$' + paramCount, false);
          funcNode.params.push(paramNode);
          const localParamName = createFreshVar('tmpOutlinedParam', fdata);
          const localParamNode = AST.variableDeclaration(localParamName, paramName, 'const');
          funcNode.body.body.splice(funcNode.$p.bodyOffset - 1, 0, localParamNode);
          // Not sure if this needs anything else tbh.

          // Replace the expression that we're outlining...
          if (stmt.type === 'VariableDeclaration') {
            stmt.declarations[0].init = AST.identifier(localParamName);
          } else if (stmt.expression === expr) {
            stmt.expression = AST.identifier(localParamName);
          } else if (stmt.expression.type === 'AssignmentExpression') {
            stmt.expression.right = AST.identifier(localParamName);
          } else {
            ASSERT(false);
          }

          // Update all the call sites
          meta.reads.forEach((read) => {
            queue.push({
              index: read.blockIndex,
              func: () => {
                rule('Part 2: add a new arg in calls to the function');
                example('f(a);', 'let tmp = a + 1; f(a, tmp);');
                before(read.blockBody[read.blockIndex]);

                // Must first cache the expression in case it's a string... (otherwise we may accidentally break normalized form)
                // Other rules will reconcile this temporary alias, or melt the string concat, when necessary.
                const tmpNameA = createFreshVar('tmpSaooA', fdata);
                const tmpNameB = createFreshVar('tmpSaooB', fdata);

                const args = read.parentNode['arguments'];
                // Make sure there are enough params right now otherwise our new arg will become an earlier one and map to the wrong param (-> tests/cases/normalize/defaults/one.md)
                while (paramCount > args.length) {
                  args.push(AST.identifier('undefined'));
                }
                read.blockBody.splice(
                  read.blockIndex,
                  0,
                  AST.variableDeclaration(
                    tmpNameA,
                    AST.cloneSimple(read.parentNode['arguments'][paramIndex] || AST.identifier('undefined')),
                    'const',
                  ),
                  AST.variableDeclaration(tmpNameB, AST.binaryExpression(expr.operator, tmpNameA, AST.cloneSimple(expr.right)), 'const'),
                );
                read.parentNode['arguments'].push(AST.identifier(tmpNameB));

                after(read.blockBody[read.blockIndex]);
                after(read.blockBody[read.blockIndex + 1]);
              },
            });
          });

          after(meta.constValueRef.containerNode);
          ++changes;
        } else {
          rule(
            'Part 1: When a function is only called and uses a param in its first statement then we can outline this expression; binary rhs single-use',
          );
          example(
            'function f(a) { const x = a + 1; return x; } f(1); f("a");',
            'function f(a) { const x = a; return x; } f(1 + 1); f("a" + 1);',
          );
          before(meta.constValueRef.containerNode);
          meta.reads.forEach((read) => before(read.parentNode));

          // We replace the binary expression with just the param name
          // We replace the argument at this position with the same binary expression for all calls to this function
          // Must be careful with spreads, rest, and missing arguments (or do we guarantee those in normalized state? I don't think we can?)
          // But we've already verified that spreads did not occur, we ignore rest for now, and assume missing args always exist.
          // TODO: if the param concerns a rest we should bail
          // TODO: not sure if we should do it here but if it reaches here with a rest param then we can eliminate this rest statically

          if (stmt.type === 'VariableDeclaration') {
            stmt.declarations[0].init = expr.left;
          } else if (stmt.expression === expr) {
            stmt.expression = expr.left;
          } else if (stmt.expression.type === 'AssignmentExpression') {
            stmt.expression.right = expr.left;
          } else {
            ASSERT(false);
          }

          meta.reads.forEach((read) => {
            queue.push({
              index: read.blockIndex,
              func: () => {
                rule('Part 2: transform the args in calls to the function');
                example('f(a);', 'var tmp = a + 1; f(tmp);');
                before(read.blockBody[read.blockIndex]);

                // Must first cache the expression in case it's a string... (otherwise we may accidentally break normalized form)
                // Other rules will reconcile this temporary alias, or melt the string concat, when necessary.
                const tmpNameA = createFreshVar('tmpSaooA', fdata);
                const tmpNameB = createFreshVar('tmpSaooB', fdata);
                read.blockBody.splice(
                  read.blockIndex,
                  0,
                  AST.variableDeclaration(tmpNameA, read.parentNode['arguments'][paramIndex] || AST.identifier('undefined'), 'const'),
                  AST.variableDeclaration(tmpNameB, AST.binaryExpression(expr.operator, tmpNameA, AST.cloneSimple(expr.right)), 'const'),
                );
                read.parentNode['arguments'][paramIndex] = AST.identifier(tmpNameB);

                after(read.blockBody[read.blockIndex]);
                after(read.blockBody[read.blockIndex + 1]);
              },
            });
          });

          after(meta.constValueRef.containerNode);
          ++changes;
        }

        return;
      } else if (expr.right.type === 'Identifier') {
        const paramIndex = names.indexOf(expr.right.name);
        if (paramIndex < 0) {
          vlog('- The lhs was not a param, bailing');
          return;
        }

        if (funcNode.params[paramIndex].rest) {
          vlog('- The target param is a rest param, bailing');
          return;
        }

        // The param should only have one read (for now, TODO: we can probably support a few more cases but we have to make sure all the usages are okay with the updated value)
        const pmeta = fdata.globallyUniqueNamingRegistry.get(expr.right.name);
        const multi = pmeta.reads.length > 1;
        // TODO: support the multi

        if (pmeta.reads.length > 1) {
          vlog('- The param has more than one reads so we cannot safely do this, bailing');
          return;
        }
        // I think writes are not irrelevant here

        // Right side uses it. Woohoo

        if (!AST.isPrimitive(expr.left)) {
          vlog('- The lhs was a param but the rhs was not a primitive, bailing (for now)');
          return;
        }

        // So this function is called in all reads, uses a param in a binary expression in its first statement, and this
        // binary expression also has a primitive to the other side. Looks like we can outline it.

        rule(
          'Part 1: When a function is only called and uses a param in its first statement then we can outline this expression; binary lhs',
        );
        example(
          'function f(a) { const x = a + 1; return x; } f(1); f("a");',
          'function f(a) { const x = a; return x; } f(1 + 1); f("a" + 1);',
        );
        before(meta.constValueRef.containerNode);
        meta.reads.forEach((read) => before(read.parentNode));

        // We replace the binary expression with just the param name
        // We replace the argument at this position with the same binary expression for all calls to this function
        // Must be careful with spreads, rest, and missing arguments (or do we guarantee those in normalized state? I don't think we can?)
        // But we've already verified that spreads did not occur, we ignore rest for now, and assume missing args always exist.
        // TODO: if the param concerns a rest we should bail
        // TODO: not sure if we should do it here but if it reaches here with a rest param then we can eliminate this rest statically

        if (stmt.type === 'VariableDeclaration') {
          stmt.declarations[0].init = expr.right;
        } else if (stmt.expression === expr) {
          stmt.expression = expr.right;
        } else if (stmt.expression.type === 'AssignmentExpression') {
          stmt.expression.right = expr.right;
        } else {
          ASSERT(false);
        }

        meta.reads.forEach((read) => {
          queue.push({
            index: read.blockIndex,
            func: () => {
              rule('Part 2: transform the args in calls to the function');
              example('f(a);', 'var tmp = a + 1; f(tmp);');
              before(read.blockBody[read.blockIndex]);

              // Must first cache the expression in case it's a string... (otherwise we may accidentally break normalized form)
              // Other rules will reconcile this temporary alias, or melt the string concat, when necessary.
              const tmpNameA = createFreshVar('tmpSaooA', fdata);
              const tmpNameB = createFreshVar('tmpSaooB', fdata);
              read.blockBody.splice(
                read.blockIndex,
                0,
                AST.variableDeclaration(tmpNameA, read.parentNode['arguments'][paramIndex] || AST.identifier('undefined'), 'const'),
                AST.variableDeclaration(tmpNameB, AST.binaryExpression(expr.operator, AST.cloneSimple(expr.left), tmpNameA), 'const'),
              );
              read.parentNode['arguments'][paramIndex] = AST.identifier(tmpNameB);

              after(read.blockBody[read.blockIndex]);
              after(read.blockBody[read.blockIndex + 1]);
            },
          });
        });

        after(meta.constValueRef.containerNode);
        ++changes;

        return;
      } else {
        vlog('- Neither side of the binary expression uses a param, bailing');
        return;
      }
    } else if (expr.type === 'UnaryExpression') {
      // `function f(a) { const x = ~a; }`

      if (expr.argument.type !== 'Identifier') {
        vlog('- The argument is not an ident, bailing');
        return;
      }

      const paramIndex = names.indexOf(expr.argument.name);
      if (paramIndex < 0) {
        vlog('- The lhs was not a param, bailing');
        return;
      }

      if (funcNode.params[paramIndex].rest) {
        vlog('- The target param is a rest param, bailing');
        return;
      }

      // The param should only have one read (for now, TODO: we can probably support a few more cases but we have to make sure all the usages are okay with the updated value)
      const pmeta = fdata.globallyUniqueNamingRegistry.get(expr.argument.name);
      if (pmeta.reads.length > 1) {
        vlog('- The param has more than one reads so we cannot safely do this, bailing');
        return;
      }
      // I think writes are not irrelevant here

      // Argument side uses it. Woohoo

      // So this function is called in all reads, uses a param in a binary expression in its first statement, and this
      // binary expression also has a primitive to the other side. Looks like we can outline it.

      rule(
        'Part 1: When a function is only called and uses a param in its first statement then we can outline this expression; binary rhs',
      );
      example(
        'function f(a) { const x = a + 1; return x; } f(1); f("a");',
        'function f(a) { const x = a; return x; } f(1 + 1); f("a" + 1);',
      );
      before(meta.constValueRef.containerNode);
      meta.reads.forEach((read) => before(read.parentNode));

      // We replace the binary expression with just the param name
      // We replace the argument at this position with the same binary expression for all calls to this function
      // Must be careful with spreads, rest, and missing arguments (or do we guarantee those in normalized state? I don't think we can?)
      // But we've already verified that spreads did not occur, we ignore rest for now, and assume missing args always exist.
      // TODO: if the param concerns a rest we should bail
      // TODO: not sure if we should do it here but if it reaches here with a rest param then we can eliminate this rest statically

      if (stmt.type === 'VariableDeclaration') {
        stmt.declarations[0].init = expr.argument;
      } else if (stmt.expression === expr) {
        stmt.expression = expr.argument;
      } else if (stmt.expression.type === 'AssignmentExpression') {
        stmt.expression.right = expr.argument;
      } else {
        ASSERT(false);
      }

      meta.reads.forEach((read) => {
        queue.push({
          index: read.blockIndex,
          func: () => {
            rule('Part 2: transform the args in calls to the function');
            example('f(a);', 'var tmp = a + 1; f(tmp);');
            before(read.blockBody[read.blockIndex]);

            // Must first cache the expression in case it's a string... (otherwise we may accidentally break normalized form)
            // Other rules will reconcile this temporary alias, or melt the string concat, when necessary.
            const tmpNameA = createFreshVar('tmpSaooA', fdata);
            const tmpNameB = createFreshVar('tmpSaooB', fdata);
            read.blockBody.splice(
              read.blockIndex,
              0,
              AST.variableDeclaration(tmpNameA, read.parentNode['arguments'][paramIndex] || AST.identifier('undefined'), 'const'),
              AST.variableDeclaration(tmpNameB, AST.unaryExpression(expr.operator, tmpNameA), 'const'),
            );
            read.parentNode['arguments'][paramIndex] = AST.identifier(tmpNameB);

            after(read.blockBody[read.blockIndex]);
            after(read.blockBody[read.blockIndex + 1]);
          },
        });
      });

      after(meta.constValueRef.containerNode);
      ++changes;

      return;
    } else if (expr.type === 'CallExpression') {
      // `function f(a) { const x = g(a); }`
      vlog('- For now we skip the call case');
      return;
    } else if (expr.type === 'NewExpression') {
      // `function f(a) { const x = new g(a); }`
      vlog('- For now we skip the new case');
      return;
    } else {
      vlog('- The expression was not one of the expected types:', expr.type);
      return;
    }
  }

  if (changes) {
    vgroup('Unrolling call queue now:');

    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    vgroupEnd();

    log('Static arg ops outlined:', changes, '. Restarting from phase1 to fix up read/write registry\n');
    return 'phase1';
  }
  log('Static arg ops outlined: 0.\n');
}
