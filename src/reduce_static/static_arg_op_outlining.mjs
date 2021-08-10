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

  function process(meta, name) {
    // Verify that
    // - The function is only called, doesn't escape
    // - The function has at least one arg
    // - The function has some kind of expression in the first statement that uses an arg
    // - None of the calls use a spread (and later we can still proceed if the param is before the spread in all calls)
    // - The function is not direct recursive (tests/cases/primitive_arg_inlining/recursion/_base.md). Probably also not indirectly recursive (?)

    const funcNode = meta.constValueRef.node;
    if (funcNode.params.length === 0) {
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

        // The param should only have one read (for now, TODO: we can probably support a few more cases but we have to make sure all the usages are okay with the updated value)
        const pmeta = fdata.globallyUniqueNamingRegistry.get(expr.left.name);
        if (pmeta.reads.length > 1) {
          vlog('- The param has more than one reads so we cannot safely do this, bailing');
          return;
        }
        // I think writes are not irrelevant here

        // Left side uses it. Woohoo

        if (!AST.isPrimitive(expr.right)) {
          vlog('- The lhs was a param but the rhs was not a primitive, bailing (for now)');
          return;
        }

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
