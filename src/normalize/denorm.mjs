// This attempts to clean up the output and generate regular JS again, eliminating some obvious artifacts from Preval
// Given code should be normalized and the settled result of running Preval

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before, after, assertNoDupeNodes, rule, riskyRule, example } from '../utils.mjs';
import { VERBOSE_TRACING } from '../constants.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_DOTCALL, SYMBOL_LOOP_UNROLL, SYMBOL_MAX_LOOP_UNROLL } from '../symbols_preval.mjs';
import { isComplexNode } from '../ast.mjs';

export function denorm(fdata, resolve, req, options) {
  const ast = fdata.tenkoOutput.ast;
  group('\n\n\n##################################\n## denorm  ::  ' + fdata.fname + '\n##################################\n\n\n');
  if (VERBOSE_TRACING) vlog('\nCurrent state (before denorm)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
  vlog('\n\n\n##################################\n## denorm  ::  ' + fdata.fname + '\n##################################\n');
  vlog('Converting normalized code back to somewhat regular JS code...\n\n\n\n');

  {
    const {...rest} = options;
    const keys = Object.keys(rest);
    ASSERT(keys.length === 0, 'denorm should not receive these options or this should be updated', keys);
  }

  let changed = false;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    const wat = nodeType + (beforeWalk ? ':before' : ':after');
    if (beforeWalk) vgroup('-- ', nodeType);
    else {
      vlog('  /' + nodeType);
      vgroupEnd();
    }

    // Reminder: only return when replacing the node itself, not for mutating one of its properties
    // This denorm is called repeatedly until it settles
    switch (wat) {
      case 'CallExpression:before': {
        // When you call $dotCall with a member expression as first arg, and the ident equal to the
        // object of that member expressio as second arg, you can just call that member expression
        // directly, dropping the first two args. $dotCall is just func.call() after all.
        // - `$dotCall(a.b, a, 'b', 1, 2)` => `a.b(1, 2)`
        // - `$dotCall(a[b], a, undefined, 1, 2)` => `a.b(1, 2)`
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === SYMBOL_DOTCALL &&
          node.arguments[0]?.type === 'MemberExpression' &&
          node.arguments[0].object.type === 'Identifier' &&
          node.arguments[1]?.type === 'Identifier' &&
          node.arguments[0].object.name === node.arguments[1].name
        ) {
          rule('Calling $dotCall with a member and then the object of that member should fold');
          example('$dotCall(a.b, a, "b", x, y)', 'a.b(x, y)');
          before(node);

          node.callee = node.arguments.shift(); // member expression
          node.arguments.shift(); // second arg; object of member expression of the first arg

          after(node);
          changed = true;
        }
        break;
      }
      case 'FunctionExpression:before': {
        // Undo function header
        let pointer = 0;
        do {
          // A function header exists as long as the initial var decls have a Param as rhs

          const next = node.body.body[pointer++];
          if (!next) break;

          if (next.type === 'DebuggerStatement') {
            // Only emit for the header boundary case...

            rule('Drop custom function headers');
            example('function f($$0, $$1) { const x = $$0; const y = $$1; Debugger; }', 'function f(x, y) {}');
            before(node);

            node.body.body[pointer-1] = AST.emptyStatement(); // keep meta pointers alive

            after(node);
            changed = true;
            break;
          }

          if (next.type !== 'VariableDeclaration') break;

          const init = next.declarations[0].init;
          if (init.type === 'Param') {
            vlog('Dropping alias for', next.declarations[0].id.name, '=', next.declarations[0].init);
            node.params[init.index] = next.declarations[0].id;
            node.body.body[pointer-1  ] = AST.emptyStatement(); // keep meta pointers alive
          } else if (init.type === 'ThisExpression') {
            // Keep but skip (`const alias = this`).
          } else if (init.type === 'Identifier' && init.name === 'arguments') {
            // Keep but skip (`const alias = arguments`).
          } else if (
            init.type === 'MemberExpression' &&
            !init.computed &&
            init.object.type === 'Identifier' &&
            init.object.name === 'arguments' &&
            init.property.name === 'length'
          ) {
            // Keep but skip (`const alias = arguments.length`)
          } else {
            // We must have found the end of the header, or what's left of it.
            break;
          }
        } while (true);

        // If any statements were dropped this way that's fine. The walker did not enter the body yet so it won't ever see those.

        const last = node.body.body[node.body.body.length - 1];
        changed = dropTrailingReturnUndefined(node.body, last) || changed;

        break;
      }
      case 'IfStatement:before': {
        changed = pruneIfBranches(node) || changed;
        break;
      }
      case 'VariableDeclaration:before': {
        if (node.kind === 'const') {
          const varname = node.declarations[0].id.name;
          const init = node.declarations[0].init;

          const parentNode = path.nodes[path.nodes.length - 2];
          const parentIndex = path.indexes[path.indexes.length - 1];
          const next = parentNode.body[parentIndex + 1];

          const nextExpr =
            next?.type === 'VariableDeclaration'
            ? next.declarations[0].init
            : next?.type === 'ExpressionStatement'
            ? (next.expression.type === 'AssignmentExpression' ? next.expression.right : next.expression)
            : next?.type === 'IfStatement'
            ? next.test
            : undefined;

          if (
            // There must be a next statement
            !next ||
            // The write should not be used more than once, only then is it safe to inline
            fdata.globallyUniqueNamingRegistry.get(varname).reads.length > 1
          ) {
            // can't do this
          }
          else if (
            nextExpr &&
            next.type === 'ExpressionStatement' &&
            next.expression.type === 'AssignmentExpression' &&
            next.expression.right.type === 'Identifier' &&
            next.expression.right.name === varname &&
            // `const x = y; <y> = z;` for any kind of assignable y, including `x`, `x.y`, and `x().y`
            // Note: a member expression on the lhs is resolved/evaluated _after_ the rhs. however, x.y().z would call y first so there's that.
            (next.expression.left.type === 'Identifier' || (
              next.expression.left.type === 'MemberExpression' &&
              !next.expression.left.computed &&
              next.expression.left.object.type === 'Identifier'
            ))
          ) {
            // Ok, lhs is either an ident or a non-computed member with ident for object. Should be fine!
            rule('A var should fold when it is read/write once and used as rhs of an assignment');
            example("const x = f(); a.b = f();", "a.b = y;");
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            next.expression.right = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            next.type === 'IfStatement' &&
            next.test.type === 'Identifier' &&
            next.test.name === varname
          ) {
            rule('A var should fold when it is read/write once and used as test of an `if`');
            example("const x = a + b; if (x) ...", "if (a + b) ...");
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            next.test = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            init.type === 'CallExpression' &&
            init.callee.type === 'Identifier' &&
            init.callee.name === '$coerce' &&
            // We should be able to safely collapse this if this call is assigned to a fresh
            // var, there is one read/write for this var, and the var read is in a template
            // `const x = $coerce(a, 'plustr'); const y = `(${x})``
            nextExpr?.type === 'TemplateLiteral' &&
            nextExpr.expressions[0]?.type === 'Identifier' &&
            nextExpr.expressions[0].name === varname
          ) {
            rule('When the $coerce result is used in a template next to it, move its first arg into it');
            example("const x = $coerce(a, 'plustr'); const y = `(${x})`", "const y = `(${a})`");
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            nextExpr.expressions[0] = init.arguments[0];
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            nextExpr?.type === 'CallExpression' &&
            (nextExpr.callee.type === 'Identifier' || (nextExpr.callee.type === 'MemberExpression' && (!isComplexNode(nextExpr.callee.object) || nextExpr.callee.object.type === 'Literal'))) &&
            // Verify that the var name is the first arg or only preceded by ident/primitive args
            // Start with 0=searching. When 1=failed or 2=found, return state. When arg is complex, return 1=failed. when arg is varname return 2=found. otherwise return 1=searching.
            nextExpr.arguments.reduce((state, now) => state || ((AST.isComplexNode(now) && now.type !== 'Literal') ? 1 : (now.type === 'Identifier' && now.name === varname) ? 2 : 0), 0) === 2
          ) {
            const pos = nextExpr.arguments.findIndex(arg => arg.type === 'Identifier' && arg.name === varname);
            ASSERT(pos>=0, 'should find it because the reduce found it...');

            rule('A var should fold when it is read/write once and the read is an ident call with the write as first param');
            example('const a = x; const b = f(a, y, z);', 'const b = f(x, y, z);');
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            nextExpr.arguments[pos] = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            nextExpr?.type === 'MemberExpression' &&
            nextExpr.object.type === 'Identifier' &&
            nextExpr.object.name === varname
          ) {
            rule('A var should fold when it is read/write once and the read is object of another member');
            example('const x = a.b(); const y = x.c;', 'const y = a.b().c;');
            example('const x = a.b(); const y = x[c];', 'const y = a.b()[c];');
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            nextExpr.object = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            // Note: this has limited use because we can only replace idents (which won't
            // really occur) as anything else risks changing the `this` value of the call
            init.type === 'Identifier' &&
            nextExpr?.type === 'CallExpression' &&
            nextExpr.callee.type === 'Identifier' &&
            nextExpr.callee.name === varname
          ) {
            rule('Binding with one read and one write ref where the read is calling the var should fold');
            example('const x = a; const y = x();', 'const y = a();');
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            nextExpr.callee = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            nextExpr?.type === 'CallExpression' &&
            nextExpr.callee.type === 'MemberExpression' &&
            nextExpr.callee.object.type === 'Identifier' &&
            nextExpr.callee.object.name === varname
          ) {
            // Ironically, this won't change the `this` value so this is fine
            rule('Binding with one read and one write ref where the read is the object of a method call should fold');
            example('const x = a.b; const y = x.z();', 'const y = a.b.z();');
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            nextExpr.callee.object = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            nextExpr?.type === 'CallExpression' &&
            nextExpr.callee.type === 'Identifier' &&
            nextExpr.arguments[0]?.type === 'Identifier' &&
            nextExpr.arguments[0].name === varname
          ) {
            rule('Binding with one read and one write ref where the read is first arg to a call should fold');
            example('const x = a.b; const y = f(x);', 'const y = f(a.b);');
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            nextExpr.arguments[0] = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            nextExpr?.type === 'BinaryExpression' &&
            nextExpr.left.type === 'Identifier' &&
            nextExpr.left.name === varname
          ) {
            rule('Binding with one read and one write ref where the read is lhs of binary expression should fold');
            example('const x = a.b; const y = x * 2', 'const y = a.b * 2;');
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            nextExpr.left = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (
            nextExpr?.type === 'BinaryExpression' &&
            nextExpr.left.type === 'Identifier' && // noop (other than tdz crash)
            nextExpr.right.type === 'Identifier' &&
            nextExpr.right.name === varname
          ) {
            rule('Binding with one read and one write ref where the read is rhs of binary expression and lhs is ident should fold');
            example('const x = a.b; const y = 2 * x', 'const y = 2 * a.b;');
            before(parentNode.body[parentIndex]);
            before(parentNode.body[parentIndex + 1]);

            nextExpr.right = init;
            parentNode.body[parentIndex] = AST.emptyStatement();

            after(parentNode.body[parentIndex]);
            after(parentNode.body[parentIndex + 1]);
            changed = true;
          }
          else if (init.type === 'TemplateLiteral') {
            const parentNode = path.nodes[path.nodes.length - 2];
            const parentIndex = path.indexes[path.indexes.length - 1];
            const meta = fdata.globallyUniqueNamingRegistry.get(varname);
            const next = parentNode.body[parentIndex + 1];
            if (meta?.reads.length === 1 && next) {
              if (next.type === 'VariableDeclaration') {
                const decr = next.declarations[0];
                const nextInit = decr.init;
                // As the lhs of a `+` binary expression
                if (nextInit.type === 'BinaryExpression' && nextInit.operator === '+' && nextInit.left.type === 'Identifier') {
                  if (nextInit.left.name === varname) {
                    rule('Binding with one read and one write ref that is a string and used in lhs of `+` should fold');
                    example('const x = `${x}`; const y = x + z', 'const y = `${x}` + z;');
                    before(parentNode.body[parentIndex]);
                    before(parentNode.body[parentIndex + 1]);

                    nextInit.left = init;
                    parentNode.body[parentIndex] = AST.emptyStatement();

                    after(parentNode.body[parentIndex]);
                    after(parentNode.body[parentIndex + 1]);
                    changed = true;
                  }
                  else if (init.expressions.length === 0 && nextInit.right.name === varname) {
                    rule('Binding with one read and one write ref that is a plain string and used in a `+` should fold');
                    example('const x = `abc`; const y = z + x', 'const y = z + `abc`;');
                    before(parentNode.body[parentIndex]);
                    before(parentNode.body[parentIndex + 1]);

                    nextInit.right = init;
                    parentNode.body[parentIndex] = AST.emptyStatement();

                    after(parentNode.body[parentIndex]);
                    after(parentNode.body[parentIndex + 1]);
                    changed = true;
                  }
                }
              }
            }
          }
        }
        break;
      }
      case 'WhileStatement:before': {
        if (node.test.type === 'Identifier' && (node.test.name === SYMBOL_MAX_LOOP_UNROLL || node.test.name.startsWith(SYMBOL_LOOP_UNROLL))) {
          rule('While loops should have boolean true condition');
          example('while (SYMBOL_MAX_LOOP_UNROLL) {}', 'while (true) {}');
          before(node);

          node.test = AST.primitive(true);

          after(node);
          changed = true;
        }

        break;
      }
    }
  }

  // Now drop the empty statements. This breaks any index references, but we should be done here.
  walk(_nonempty, ast, 'ast');
  function _nonempty(node, beforeWalk, nodeType, path) {
    if (nodeType === 'BlockStatement' || nodeType === 'Program') {
      for (let i=node.body.length-1; i>=0; --i) {
        if (node.body[i].type === 'EmptyStatement') {
          node.body.splice(i, 1);
          changed = true;
        }
      }
    }
  }

  log(`\n\nAST should be denormed a bit... Anything change? ${changed}\n\n\n\n\n`);

  return changed;
}

function dropTrailingReturnUndefined(block, node) {
  if (node?.type === 'ReturnStatement' && node.argument.type === 'Identifier' && node.argument.name === 'undefined') {
    rule('Drop `return undefined` as last statement of functions');
    example('function f() { return undefined; }', 'function f() {}');
    before(node);

    block.body.pop();
    //block.body.push(AST.emptyStatement());

    after(node);
    return true;
  }
  else if (node?.type === 'IfStatement') {
    let changed = false;
    if (node.consequent.type === 'BlockStatement') changed = dropTrailingReturnUndefined(node.consequent, node.consequent.body[node.consequent.body.length - 1]) || changed;
    if (node.alternate?.type === 'BlockStatement') changed = dropTrailingReturnUndefined(node.alternate, node.alternate.body[node.alternate.body.length - 1]) || changed;
    changed = pruneIfBranches(node) || changed;
    return changed;
  }
}

function pruneIfBranches(node) {
  let changed = false;
  if (node.consequent.body.length === 0) {
    rule('if-else empty consequent is inverted if');
    example('if (x) {} else { $(x); }', 'if (!x) { $(y) }');
    before(node);

    node.test = AST.unaryExpression('!', node.test);
    node.consequent = node.alternate;
    node.alternate = null;

    after(node);
    changed = true;
  }

  if (node.alternate?.body.length === 0) {
    rule('if-else empty alternate should drop alternate');
    example('if (x) { $(x); } else {}', 'if (x) { $(y) }');
    before(node);

    node.alternate = null;

    after(node);
    changed = true;
  }

  return changed;
}
