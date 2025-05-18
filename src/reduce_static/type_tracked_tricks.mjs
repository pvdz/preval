// By doing some type tracking we can apply some more in depth tricks in phase 2

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
  assertNoDupeNodes,
  todo,
  riskyRule
} from '../utils.mjs';
import {
  ARGUMENTS_ALIAS_BASE_NAME,
  SYMBOL_DOTCALL,
  BUILTIN_REST_HANDLER_NAME,
  SYMBOL_LOOP_UNROLL,
  SYMBOL_MAX_LOOP_UNROLL, SYMBOL_COERCE,
} from '../symbols_preval.mjs';
import {
  BUILTIN_SYMBOLS,
  BUILTIN_FUNC_NO_CTX,
  symbo,
  SYMBOL_TO_BUILTIN_GLOBAL_FUNCS,
} from '../symbols_builtins.mjs';
import * as AST from '../ast.mjs';
import { getRegexFromLiteralNode, isNumberValueNode } from '../ast.mjs';
import { PRIMITIVE_TYPE_NAMES_PREVAL, PRIMITIVE_TYPE_NAMES_TYPEOF } from '../constants.mjs';
import { BUILTIN_GLOBAL_FUNC_NAMES } from '../globals.mjs';
import { createFreshVar } from '../bindings.mjs';

export function typeTrackedTricks(fdata) {
  group('\n\n\n[typeTrackedTricks] Finding type tracking based tricks\n');
  const r = _typeTrackedTricks(fdata);
  groupEnd();
  return r;
}

function _typeTrackedTricks(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;
  let queue = []; // Changes that invalidate index caches

  // TODO: is the walking of individual if-statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');

  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const grandNode = path.nodes[path.nodes.length - 3];
    const grandProp = path.props[path.props.length - 2];
    const grandIndex = path.indexes[path.indexes.length - 2];
    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

    switch (node.type) {
      case 'ExpressionStatement': {
        if (node.expression.type === 'ArrayExpression') {
          const arrNode = node.expression;
          for (let i = arrNode.elements.length - 1; i >= 0; --i) {
            const enode = arrNode.elements[i];
            if (enode && enode.type === 'SpreadElement') {
              // TODO: technically this could still eliminate a different var. We should either verify here or tag in general the `arguments` aliases
              if (enode.argument.type === 'Identifier' && enode.argument.name.startsWith(ARGUMENTS_ALIAS_BASE_NAME)) {
                vlog('This is spreading the `arguments` alias. We can drop this.');
                arrNode.elements.splice(i, 1);
              }
            }
          }
        }

        // `arr[n] = x; const y = arr[n]` when arr is an array of sorts, can safely replace the array ref by the prev assign rhs
        if (
          node.expression.type === 'AssignmentExpression' &&
          node.expression.left.type === 'MemberExpression' &&
          node.expression.left.object.type === 'Identifier' &&
          node.expression.left.computed &&
          AST.isNumberLiteral(node.expression.left.property) &&
          !AST.isComplexNode(node.expression.right) &&
          blockBody[blockIndex + 1]
        ) {
          const next = blockBody[blockIndex + 1];
          // This is some form of `ident[n] = simple`
          const targetName = node.expression.left.object.name; // This would need to be na array
          if (
            next.type === 'VarStatement' &&
            next.init.type === 'MemberExpression' &&
            next.init.object.type === 'Identifier' &&
            next.init.computed &&
            AST.isNumberLiteral(next.init.property) &&
            // Now check if previous ident[n] is equal to this ident[n]
            next.init.object.name === targetName &&
            AST.getPrimitiveValue(node.expression.left.property) === AST.getPrimitiveValue(next.init.property)
          ) {
            // This is `ident[n] = simple; const x = ident[n]`. Now verify whether ident is an array
            const arrMeta = fdata.globallyUniqueNamingRegistry.get(targetName);
            if (arrMeta.typing.mustBeType === 'array') {
              // We should be able to replace the arr[n] reference with the simple reference
              rule('Assigning to an array and reading that same array index immediately must yield same value');
              example('arr[0] = x; const y = arr[0]', 'arr[0] = x; const y =x;');
              before(node);
              before(next);

              next.init = AST.cloneSimple(node.expression.right);

              after(node);
              after(next);

              ++changes;
            }
          }
        }
        break;
      }
      case 'IfStatement': {
        // Other rules should pick up on primitive nodes in if tests.
        // But what if we know the type just not the actual value? Often we do know the falsy value.
        // Unfortunately, most of the time that value is discarded. But still. It may not be :)
        if (node.test.type === 'Identifier') {
          const testName = node.test.name;
          const testMeta = fdata.globallyUniqueNamingRegistry.get(testName);
          if (testMeta.isImplicitGlobal) {
            vlog('- Test value in', node.type, 'is implicit global, bailing');
          }
          else {
            const truthy = testMeta.typing.mustBeTruthy; // Only true when the binding can only have truthy values. Otherwise we must keep the test as is.
            const falsya = testMeta.typing.mustBeFalsy;
            ASSERT(!truthy || !falsya, 'should not be truthy and falsy at the same time', testMeta, testMeta.typing);
                // One shot for low hanging fruit: verify that the previous statement defined the test to a false primitive (IR state can cause this)
            const falsyb =
              !truthy &&
              (
                testMeta.writes.length &&
                testMeta.writes[0].kind === 'var' &&
                testMeta.writes[0].parentNode.kind === 'const' &&
                AST.isFalsy(testMeta.writes[0].parentNode.init) &&
                testMeta.writes[0].blockBody[testMeta.writes[0].blockIndex + 1] === node
              );

            vlog('--', truthy, falsya, falsyb);

            if (falsya || falsyb) {
              //TODO: test;
              // undefined/null will lead to a literal. boolean must be false. string must be empty. number is unknown but also unhandled at the moment. so I'm not sure this case can be reached right now.

              vlog('Binding must be falsy', testMeta.typing);

              rule('An `if` test with a falsy value should be replaced with `false`');
              example('if (0) {}', 'if (false) {}');
              before(node.test, node);

              // TODO: fix implicit global errors by compiling the test as a statement
              node.test = AST.fals();

              after(node.test, node);
              ++changes;
            }
            else if (truthy) {
              // Covered by tests/cases/excl/regex.md tests/cases/ifelse/harder/if_new.md
              rule('An `if` test with a truthy value should be replaced with `true`');
              example('if (1) {}', 'if (true) {}');
              before(node.test, parentNode);

              // TODO: fix implicit global errors by compiling the test as a statement
              node.test = AST.tru();

              after(node.test, node);
              ++changes;
            }
            else if ((testMeta.isConstant || testMeta.isBuiltin) && testMeta.typing.mustBeType) {
              const ttm = testMeta.typing.mustBeType;
              vlog('Found an `if` testing constant `' + node.test.name + '` with mustBeType:', ttm);
              // Cases in this switch will inline the test value if they appear in either branch of an `if`

              switch (ttm) {
                case 'undefined':
                case 'null': {
                  vlog('A value that is `undefined` or `null` should be handled by normalization');
                  break;
                  /*
                // There is no if branch ... we should be able to wipe it..?
                rule('If the `if` test is known to be a `null` or `undefined` type, drop the `if` branch entirely');
                example('const a = [][0]; if (a?.b) f(); else g();', 'const a = [][0]; g();');
                before(node.test, node);

                parentNode[parentProp].splice(parentIndex, 1, ...node.consequent.body);
                TODO: test;

                after(parentNode);
                ++changes;
                break;
                */
                }

                case 'boolean': {
                  // Replace the refs in both branches with their corresponding value

                  vlog('Finding reads to replace with true or false');
                  testMeta.reads.forEach((read, ri) => {
                    vlog(
                      '-',
                      ri,
                      ':',
                      'consequent?',
                      +node.consequent.$p.pid,
                      '<',
                      +read.node.$p.pid,
                      '<=',
                      +node.consequent.$p.lastPid,
                      '(',
                      +read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid <= +node.consequent.$p.lastPid,
                      ')',
                      ', or alternate?',
                      +node.alternate.$p.pid,
                      '<',
                      +read.node.$p.pid,
                      '<=',
                      +node.alternate.$p.lastPid,
                      '(',
                      +read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid,
                      ')',
                    );

                    if (
                      read.parentNode.type === 'WhileStatement' &&
                      (testName.startsWith(SYMBOL_LOOP_UNROLL) || testName === SYMBOL_MAX_LOOP_UNROLL)
                    ) {
                      // Ignore. Do not replace while() tests. That risks infinite loops.
                      vlog('- skipped. Not replacing while() tests with `true` here');
                    }
                    else if (+read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid <= +node.consequent.$p.lastPid) {
                      // Covered by tests/cases/type_tracked/if/base_bool_unknown_false.md
                      rule('When an `if` test is a boolean it must be `true` in the if branch');
                      example('const a = !f(); if (a) g(a); else h(a);', 'const a = !f(); if (a) g(true); else h(false);');
                      before(read.blockBody[read.blockIndex]);

                      // This read should be contained somewhere inside the `if`. Possibly even nested in a func.
                      // In any case, the bool value was a constant so it must be `true` in the consequent branch.
                      const finalNode = AST.tru();
                      if (read.parentIndex < 0) read.parentNode[read.parentProp] = finalNode;
                      else read.parentNode[read.parentProp][read.parentIndex] = finalNode;

                      before(read.blockBody[read.blockIndex]);
                      ++changes;
                    } else if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid) {
                      // Covered by tests/cases/type_tracked/if/base_bool_unknown_false.md
                      rule('When an `if` test is a boolean it must be `false` in the else branch');
                      example('const a = !f(); if (a) g(a); else h(a);', 'const a = !f(); if (a) g(true); else h(false);');
                      before(read.blockBody[read.blockIndex]);

                      // This read should be contained somewhere inside the `if`. Possibly even nested in a func.
                      // In any case, the bool value was a constant so it must be `false` in the alternate branch.
                      const finalNode = AST.fals();
                      if (read.parentIndex < 0) read.parentNode[read.parentProp] = finalNode;
                      else read.parentNode[read.parentProp][read.parentIndex] = finalNode;

                      before(read.blockBody[read.blockIndex]);
                      ++changes;
                    }
                  });

                  break;
                }

                case 'string': {
                  // We now know the value of this variable in the `else` branch.
                  vlog('Walking the reads for string replacements...');
                  testMeta.reads.forEach((read, ri) => {
                    vlog(
                      ri,
                      ': read pid:',
                      +read.node.$p.pid,
                      ', alternate pid:',
                      +node.alternate.$p.pid,
                      ', alternate end pid:',
                      node.alternate.$p.lastPid,
                    );
                    if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid) {
                      // This read should be contained somewhere inside the `if`. Possibly even nested in a func.
                      // In any case, the string value was a constant so it should be en empty string here.
                      // Covered by tests/cases/type_tracked/if/base_string_empty.md
                      rule('When an `if` test is a string it must be the empty string in the else branch');
                      example('const x = "foo".slice(a); if (x) f(x); else f(x);', 'const x = "foo".slice(a); if (x) f(x); else f("");');
                      before(read.node, node);

                      const finalNode = ttm === 'number' ? AST.literal(0) : AST.templateLiteral('');
                      if (read.parentIndex < 0) read.parentNode[read.parentProp] = finalNode;
                      else read.parentNode[read.parentProp][read.parentIndex] = finalNode;

                      after(finalNode, node);
                      ++changes;
                    }
                  });
                  break;
                }
                case 'number': {
                  // Unfortunately the value can still be `0`, `-0`, and `NaN` in this case.
                  // TODO: we can handle the `x>>>0` case, since the falsy case must be `0` (see tests/cases/type_tracked/if/base_falsy_right_shift.md)
                  // We have to bail on this prediction.
                  break;
                }

                case 'primitive': {
                  // eh.
                  break;
                }

                case 'array':
                case 'object':
                case 'function':
                case 'class':
                case 'promise':
                case 'regex': {
                  // One example is `function *f(){} const x = f(); if (x) {}`, in which x is an object here (iterator)
                  // I guess in most cases other rules will have eliminated this case long before reaching this point.

                  queue.push({
                    index: parentIndex,
                    func: () => {
                      // Covered by tests/cases/type_tracked/if/base_bool_unknown_false.md
                      rule('When an `if` test is an object type, the test is always truthy');
                      example(`function *f(){}; const x = f(); if (x) $(x); else $('nope')`, 'function *f(){} const x = f(); $(x)');
                      before(node, parentNode);

                      // Since we've asserted the value to be truthy, we should be able to simply use the consequent block and drop the rest.
                      parentNode[parentProp].splice(parentIndex, 1, ...node.consequent.body);

                      after(parentNode[parentProp][parentIndex], parentNode);
                    }
                  })
                  ++changes;
                  break;
                }
                default:
                  ASSERT(false, 'support me', ttm);
              }
            }
          }
        }

        break;
      }
      case 'UnaryExpression': {
        const arg = node.argument;
        if (node.argument.type !== 'Identifier') break;
        const argMeta = fdata.globallyUniqueNamingRegistry.get(node.argument.name);
        if (parentNode.type === 'ExpressionStatement' && (argMeta.typing.mustBePrimitive || argMeta.typing.mustBeType === 'primitive')) {

          parentNode.expression = AST.identifier('undefined');
        }
        switch (node.operator) {
          case '!': {
            if (argMeta.typing.mustBeFalsy) {
              //TODO: test;
              // Not sure whether it's currently possible to trigger this code path (only non-literal falsy value type is number)
              rule('Inverting a falsy value must yield `true`');
              example('!null', 'true');
              before(node, parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.tru();
              else parentNode[parentProp][parentIndex] = AST.tru();

              after(AST.tru(), parentNode);
              ++changes;
            }
            else if (argMeta.typing.mustBeTruthy) {
              // Covered by tests/cases/excl/regex.md
              rule('Inverting a truthy value must yield `false`');
              example('![]', 'false');
              before(node, parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.fals();
              else parentNode[parentProp][parentIndex] = AST.fals();

              after(AST.tru(), parentNode);
              ++changes;
            }
            else if (argMeta.typing.mustBeType === 'boolean') {
              ASSERT(
                typeof argMeta.typing.mustBeValue !== 'boolean',
                'if it wasnt falsy or truthy then we must not know the actual bool value...',
                arg,
              );
              if (argMeta.typing.bang) {
                // Find the var decl in the reads. We need the argument of the original bang.
                const varDeclWrite = argMeta.writes.find((write) => write.kind === 'var');
                ASSERT(varDeclWrite);
                const varNode = varDeclWrite.blockBody[varDeclWrite.blockIndex];
                ASSERT(varNode?.type === 'VarStatement', 'var decl yes?', varDeclWrite);
                vlog('Var decl for `' + argMeta.uniqueName + '`:');
                source(varNode);

                if (varNode.init.type !== 'UnaryExpression' || varNode.init.operator !== '!') {
                  vlog('This binding is no longer banging');
                  argMeta.typing.bang = false;
                } else {
                  // This binding was the result of `!x`. We can convert this expression to `Boolean(x)`
                  // because that's a single statement for the exact same outcome. So it's simpler for us.
                  // Covered by tests/cases/type_tracked/invert/double.md
                  rule('A double bang (`!!x`) should be converted to a `Boolean(x)`');
                  example('const x = !a; const y = !x; f(y);', 'const x = !a; const y = Boolean(a); f(y)');
                  before(node, parentNode);

                  ASSERT(
                    varNode.init.type === 'UnaryExpression' && varNode.init.operator === '!',
                    'the init should have been a unary bang as well',
                    varNode.init,
                  );
                  const originalArg = varNode.init.argument;

                  // Note: this is normalized code so the arg should be simple at this point
                  // Note: the current node is the bang, not the arg, so we just want to replace in the parent
                  const finalNode = AST.callExpression(symbo('boolean', 'constructor'), [AST.cloneSimple(originalArg)]);
                  if (parentIndex < 0) parentNode[parentProp] = finalNode;
                  else parentNode[parentProp][parentIndex] = finalNode;

                  after(finalNode, parentNode);
                  ++changes;
                }
              }
            }
            break;
          }
          case '~': {
            // Any falsy value that is the argument of ~ will result in -1...
            // Unfortunately we won't see the tilde very often in real world code ;)
            if (argMeta.typing.mustBeFalsy) {
              rule('Bitwise inverting a falsy value yields `-1`');
              example('~null', '-1');
              before(node, parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.literal(-1);
              else parentNode[parentProp][parentIndex] = AST.literal(-1);

              after(AST.tru(), parentNode);
              ++changes;
            }
            break;
          }
          case 'typeof': {
            // If we pinned the type then we can replace the result of `typeof` here
            switch (argMeta.typing.mustBeType) {
              // null, array, array (lit), object (plain), function, class, set, map, regex
              case 'undefined': {
                // Can this place be reached at all? Either way, normalization should handle it...
                //TODO: test;
                break;
              }
              case 'null': {
                // Can this place be reached at all? Either way, normalization should handle it...
                //TODO: test;
                break;
              }
              case 'boolean': {
                // Covered by tests/cases/type_tracked/typeof/base.md
                rule('A `typeof` on a value that must be a boolena can be resolved');
                example('typeof a === b;', '"boolean";');
                before(node, parentNode);

                const finalNode = AST.templateLiteral('boolean');
                if (parentIndex < 0) parentNode[parentProp] = finalNode;
                else parentNode[parentProp][parentIndex] = finalNode;

                after(finalNode, parentNode);
                ++changes;
                break;
              }
              case 'number': {
                // Covered by tests/cases/type_tracked/typeof/base.md
                rule('A `typeof` on a value that must be a number can be resolved');
                example('typeof a * b;', '"number";');
                before(node, parentNode);

                const finalNode = AST.templateLiteral('number');
                if (parentIndex < 0) parentNode[parentProp] = finalNode;
                else parentNode[parentProp][parentIndex] = finalNode;

                after(finalNode, parentNode);
                ++changes;
                break;
              }
              case 'string': {
                // Covered by tests/cases/type_tracked/typeof/base_regex.md
                rule('A `typeof` on a value that must be a string can be resolved');
                example('typeof String(x);', '"string";');
                before(node, parentNode);

                const finalNode = AST.templateLiteral('string');
                if (parentIndex < 0) parentNode[parentProp] = finalNode;
                else parentNode[parentProp][parentIndex] = finalNode;

                after(finalNode, parentNode);
                ++changes;
                break;
              }
              case 'regex':
              case 'array':
              case 'object':
              case 'set':
              case 'map':
              case 'promise':
              {
                // Covered by tests/cases/type_tracked/typeof/base_object.md
                rule('A `typeof` on a value that must be an object type can be resolved');
                example('typeof /foo/;', '"object";');
                before(node, parentNode);

                const finalNode = AST.templateLiteral('object');
                if (parentIndex < 0) parentNode[parentProp] = finalNode;
                else parentNode[parentProp][parentIndex] = finalNode;

                after(finalNode, parentNode);
                ++changes;
                break;
              }
              case 'class': // Note: typeof class is 'function' !
              case 'function':
              {
                // Covered by tests/cases/type_tracked/typeof/base_function.md
                rule('A `typeof` on a value that must be a function can be resolved');
                example('typeof function(){};', '"function";');
                before(node, parentNode);

                const finalNode = AST.templateLiteral('function');
                if (parentIndex < 0) parentNode[parentProp] = finalNode;
                else parentNode[parentProp][parentIndex] = finalNode;

                after(finalNode, parentNode);
                ++changes;
                break;
              }

              case 'primitive': {
                break; // cant predict
              }

              case undefined:
              case false:
                break;
              default:
                ASSERT(false, 'support this mustBeType enum value...', argMeta.typing);
            }
            break;
          }
        }
        break;
      }
      case 'BinaryExpression': {
        const left = node.left;
        const right = node.right;
        vlog('bin expr:', left.type, '`' + node.operator + '`', right.type);
        switch (node.operator) {
          case '===':
          case '!==': {
            const lp = AST.isPrimitive(left);
            const rp = AST.isPrimitive(right);
            // Note: the code runs as if it was `===` and inverts the result afterwards if the op is `!==`
            if (left.type === 'Identifier' && right.type === 'Identifier') {
              // Both are idents and not primitives
              // Covered by tests/cases/type_tracked/eqeqeq/eq_number_string.md
              const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
              const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);

              const lt = leftMeta.typing.mustBeType;
              const rt = rightMeta.typing.mustBeType;
              vlog(
                'yah?',
                leftMeta.isConstant || leftMeta.isBuiltin,
                rightMeta.isConstant || rightMeta.isBuiltin,
                left.name,
                right.name,
                [lt, rt],
                right,
                leftMeta.typing.mustBeType,
                rightMeta.typing.mustBeType,
              );

              if ((leftMeta.isConstant || leftMeta.isBuiltin) && (rightMeta.isConstant || rightMeta.isBuiltin)) {
                if (lt && lt !== 'primitive' && rt && rt !== 'primitive' && lt !== rt) {
                  rule('Strict n/equal comparison between two idents when we know they must be different types can be resolved');
                  example(
                    'const a = $(undefined); const b = $(undefined); a === b;',
                    'const a = $(undefined); const b = $(undefined); true;',
                  );
                  before(node, grandNode);
                  vlog('left mustBeType:', lt, ', right mustBeType:', rt, ', op:', node.operator, ', result:', node.operator === '!==');

                  if (parentIndex < 0) parentNode[parentProp] = AST.primitive(node.operator === '!==');
                  else parentNode[parentProp][parentIndex] = AST.primitive(node.operator === '!==');

                  after(AST.fals(), grandNode);
                  ++changes;
                  break;
                }
              } else {
                // Since `===` and `!==` are type sensitive, we can predict their outcome even if we
                // don't know their concrete values. If we reached here then it means that either:
                // - we don't have type information about the left or right ident, or
                // - their type matches (in which case we can't predict anything)
              }
            }
            else if (left.type === 'Identifier' && rp) {
              // Left ident, right a primitive node
              const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
              const lt = leftMeta.typing.mustBeType;
              vlog('Left type:', [lt], ', right value:', [right.$p.primitiveNodeValue], 'operator:', '`' + node.operator + '`');
              // Note that the rhs is a primitive so no need to check explicitly for class.
              // We do explicitly check for `null` just in case, even though that case may never reach here.
              const rt = right.$p.primitiveNodeValue === null ? 'null' : typeof right.$p.primitiveNodeValue;
              if ((leftMeta.isConstant || leftMeta.isBuiltin) && lt && lt !== 'primitive' && lt !== rt) {
                // Covered: tests/cases/bit_hacks/and_eq_bad.md
                rule('Strict n/equal comparison between an ident and a primitive depends on their type');
                example('const x = 1 * f(2); g(x === "");', 'const x = 1 * f(2); g(false);');

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(node.operator === '!==');
                else parentNode[parentProp][parentIndex] = AST.primitive(node.operator === '!==');

                after(AST.fals(), grandNode);
                ++changes;
                break;
              } else {
                // The typing for left is not known or does not match the type of the primitive to the right.
              }
            }
            else if (right.type === 'Identifier' && lp) {
              // Right ident, left a primitive node
              const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);
              const rt = rightMeta.typing.mustBeType;
              // Note that the rhs is a primitive so no need to check explicitly for class.
              // We do explicitly check for `null`
              const lt = left.$p.primitiveNodeValue === null ? 'null' : typeof left.$p.primitiveNodeValue;
              if ((rightMeta.isConstant || rightMeta.isBuiltin) && rt && rt !== 'primitive' && rt !== lt) {
                // Covered: tests/cases/bit_hacks/and_eq_bad.md
                rule('Strict n/equal comparison between a primitive and an ident depends on their type');
                example('const x = 1 * f(2); g("" === x);', 'const x = 1 * f(2); g(false);');
                // Note: we're acting as if op is ===

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(node.operator === '!==');
                else parentNode[parentProp][parentIndex] = AST.primitive(node.operator === '!==');

                after(AST.fals(), grandNode);
                ++changes;
                break;
              } else {
                // The typing for right is not known or does not match the type of the primitive to the left.
              }
            }
            else {
              // Either left or right was not an ident and neither was an ident and primitive pair.
              // Normalization can take care of the double primitive case here.
            }

            break;
          }

          case '==':
          case '!=':
            // https://tc39.es/ecma262/#sec-islooselyequal
            // Comparing anything to null or undefined is not observable
            // Comparing object types to each other is not observable
            // In all other cases at least one side is a primitive and the other side is coerced to one if it isn't too

            // - `x == x`
            if (left.type === 'Identifier' && right.type === 'Identifier' && left.name === right.name) {
              // Trivial case but maybe an artifact of sorts?
              rule('Weak comparison when left and right are same ident must result in equality');
              example('x == x', 'true');
              before(blockBody[blockIndex]);

              ASSERT(parentIndex < 0);
              parentNode[parentProp] = AST.primitive(node.operator === '==');

              after(blockBody[blockIndex]);
              ++changes;
              break;
            }

            const lp = AST.isPrimitive(left);
            const rp = AST.isPrimitive(right);
            const lt = lp ? AST.getPrimitiveType(left) : undefined;
            const rt = rp ? AST.getPrimitiveType(right) : undefined;

            vlog('Primitive types:', [lt, rt]);

            if (lp && rp && lt === rt) {
              rule('Weak comparison when left and right are same primitive type is strict comparison');
              example('+x == +y', '+x === +y');
              before(blockBody[blockIndex]);

              node.operator = node.operator === '==' ? '===' : '!==';

              after(blockBody[blockIndex]);
              ++changes;
              break;
            }
            else if (lp && !rp && node.right.type === 'Identifier') {
              const pv = AST.getPrimitiveValue(node.left);
              // We can assert a few cases using the .typing data
              const meta = fdata.globallyUniqueNamingRegistry.get(node.right.name);
              if (
                (pv === undefined || pv == null) &&
                meta.typing.mustBeType !== 'null' &&
                meta.typing.mustBeType !== 'undefined' &&
                PRIMITIVE_TYPE_NAMES_TYPEOF.has(meta.typing.mustBeType)
              ) {
                ASSERT(
                  meta.typing.mustBeType !== 'undefined' && meta.typing.mustBeType !== 'null',
                  'already confirmed not to be a primitive',
                );
                // The only two things that weakly compare equal to `null` or `undefined` are `null` and `undefined`.
                // So as long as that's not the values it can't match.
                rule('Weak comparison of nullables to non-nullable never works out; left');
                example('null == 0', 'false');
                before(blockBody[blockIndex]);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(node.operator !== '==');
                else parentNode[parentProp][parentIndex] = AST.primitive(node.operator !== '==');

                after(blockBody[blockIndex]);
                ++changes;
                break;
              }
              else if (
                pv == null &&
                ['object', 'array', 'set', 'map', 'regex', 'function', 'promise'].includes(meta.typing.mustBeType)
              ) {
                rule('Comparing a null with an object type always results in false');
                example('null == []', 'false', () => node.operator === '==');
                before(blockBody[blockIndex]);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                // (A binary expression must always be an rhs, expression, or init, so no index)
                parentNode[parentProp] = AST.primitive(node.operator !== '==');

                after(blockBody[blockIndex]);
                ++changes;
                break;
              }
            }
            else if (!lp && rp && node.left.type === 'Identifier') {

              const pv = AST.getPrimitiveValue(node.right);
              // We can assert a few cases using the .typing data
              const meta = fdata.globallyUniqueNamingRegistry.get(node.left.name);

              if (
                (pv === undefined || pv == null) &&
                meta.typing.mustBeType !== 'null' &&
                meta.typing.mustBeType !== 'undefined' &&
                PRIMITIVE_TYPE_NAMES_TYPEOF.has(meta.typing.mustBeType)
              ) {
                ASSERT(
                  meta.typing.mustBeType !== 'undefined' && meta.typing.mustBeType !== 'null',
                  'already confirmed not to be a primitive',
                );
                // The only two things that weakly compare equal to `null` or `undefined` are `null` and `undefined`.
                // So as long as that's not the values it can't match.
                rule('Weak comparison of nullables to non-nullable never works out; right');
                example('null == 0', 'false');
                before(blockBody[blockIndex]);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(node.operator !== '==');
                else parentNode[parentProp][parentIndex] = AST.primitive(node.operator !== '==');

                after(blockBody[blockIndex]);
                ++changes;
                break;
              }
              else if (
                pv == null &&
                ['object', 'array', 'set', 'map', 'regex', 'function'].includes(meta.typing.mustBeType)
              ) {
                rule('Comparing a null with an object type always results in false');
                example('null == []', 'false', () => node.operator === '==');
                before(blockBody[blockIndex]);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                // (A binary expression must always be an rhs, expression, or init, so no index)
                parentNode[parentProp] = AST.primitive(node.operator !== '==');

                after(blockBody[blockIndex]);
                ++changes;
                break;
              }
            }

            if (!lp && !rp) {
              // We can assert a few cases using the .typing data
              const lmeta = fdata.globallyUniqueNamingRegistry.get(node.left.name);
              const rmeta = fdata.globallyUniqueNamingRegistry.get(node.right.name);

              if (
                PRIMITIVE_TYPE_NAMES_TYPEOF.has(lmeta.typing.mustBeType) &&
                PRIMITIVE_TYPE_NAMES_TYPEOF.has(rmeta.typing.mustBeType) &&
                lmeta.typing.mustBeType === rmeta.typing.mustBeType
              ) {
                // We know that when both sides are object but of a different kind, that the result is false
                // But we may as well consolidate that logic inside the strict comparison handlers. So we just delegate here.
                rule('When we know each side of a weak comparison must be the same certain primitive, use strong comparisons instead');
                example('+x == +y', '+x === +y');
                before(blockBody[blockIndex]);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                node.operator = node.operator === '==' ? '===' : '!==';

                after(blockBody[blockIndex]);
                ++changes;
                break;
              }

              if (
                lmeta.typing.mustBeType === rmeta.typing.mustBeType &&
                ['array', 'set', 'map', 'regex', 'function'].includes(lmeta.typing.mustBeType)
              ) {
                // We know that when both sides are object but of a different kind, that the result is false
                // But we may as well consolidate that logic inside the strict comparison handlers. So we just delegate here.
                rule('When we know each side of a weak comparison must be an object of sorts, use strong comparisons instead');
                example('[] == []', '[] === []', () => node.operator === '==');
                example('[] != []', '[] !== []', () => node.operator === '!=');
                before(blockBody[blockIndex]);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                node.operator = node.operator === '==' ? '===' : '!==';

                after(blockBody[blockIndex]);
                ++changes;
                break;
              }

              if (
                lmeta.typing.mustBeType !== rmeta.typing.mustBeType &&
                ['array', 'set', 'map', 'regex', 'function'].includes(lmeta.typing.mustBeType) &&
                ['array', 'set', 'map', 'regex', 'function'].includes(rmeta.typing.mustBeType)
              ) {
                // We know that when both sides are object but of a different kind, that the result is false
                // But we may as well consolidate that logic inside the strict comparison handlers. So we just delegate here.
                rule('When we know each side of a weak comparison must be an object of sorts but not the same type, the result is always false');
                example('[] == {}', 'false');
                before(blockBody[blockIndex]);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                // (A binary expression must always be an rhs, expression, or init, so no index)
                parentNode[parentProp] = AST.primitive(node.operator !== '==');

                after(blockBody[blockIndex]);
                ++changes;
                break;
              }

              // Silly case but when the lhs or rhs is assigned a fresh obj instance of any sort
              // and the other side is too and we can prove that they are or cannot be the same
              // instance then we also know without a doubt what the result is going to be.
              // We will check a few superficial cases; there's many to cover.
              if (lmeta.varDeclRef && rmeta.varDeclRef && lmeta.writes.length === 1 && rmeta.writes.length === 1) {
                // When the init is an obj/arr/map/set/regex instance and this is the only
                // other read, then the comparison must fail.

                const linit = lmeta.varDeclRef.node;
                const rinit = rmeta.varDeclRef.node;

                const lIsInstance =
                  linit.type === 'ObjectExpression' ||
                  linit.type === 'ArrayExpression' ||
                  linit.type === 'FunctionExpression' ||
                  (
                    linit.type === 'NewExpression' &&
                    linit.callee.type === 'Identifier' &&
                    [
                      symbo('regex', 'constructor'),
                      symbo('set', 'constructor'),
                      symbo('map', 'constructor'),
                      symbo('array', 'constructor'),
                      symbo('string', 'constructor'),
                      symbo('number', 'constructor'),
                      symbo('boolean', 'constructor'),
                      symbo('function', 'constructor'),
                      symbo('date', 'constructor'),
                      symbo('object', 'constructor'),
                    ].includes(linit.callee.name)
                  );
                const rIsInstance =
                  rinit.type === 'ObjectExpression' ||
                  rinit.type === 'ArrayExpression' ||
                  rinit.type === 'FunctionExpression' ||
                  (
                    rinit.type === 'NewExpression' &&
                    rinit.callee.type === 'Identifier' &&
                    [
                      symbo('regex', 'constructor'),
                      symbo('set', 'constructor'),
                      symbo('map', 'constructor'),
                      symbo('array', 'constructor'),
                      symbo('string', 'constructor'),
                      symbo('number', 'constructor'),
                      symbo('boolean', 'constructor'),
                      symbo('function', 'constructor'),
                      symbo('date', 'constructor'),
                      symbo('object', 'constructor'),
                    ].includes(rinit.callee.name)
                  );
                vlog('Is left an obj instance?', lIsInstance, ', and is right?', rIsInstance);
                if (lIsInstance && rIsInstance) {
                  // Both sides are an object reference of sorts and both have one write; they cannot be equal
                  rule('When comparing two references that must be obj instances inits that are constants, they can not be equal');
                  example('const x = []; const y = []; x == y', 'false');
                  before(blockBody[blockIndex]);

                  // Weak comparison will always be false when both sides are not primitives and not the same instance.
                  // We've asserted both sides must be objects and cannot be the same instance, so we can resolve the comparison.

                  parentNode[parentProp] = AST.primitive(node.operator !== '==');

                  after(blockBody[blockIndex]);
                  ++changes;
                  break;
                }
              }
            }

            break;

          case '+': {
            let lit;
            let val;
            if (AST.isStringValue(left, '')) {
              lit = left;
              val = right;
            } else if (AST.isStringValue(right, '')) {
              lit = right;
              val = left;
            }

            if (lit && val.type === 'Identifier') {
              const meta = fdata.globallyUniqueNamingRegistry.get(val.name);

              if (lit) {
                if (!meta.isImplicitGlobal && meta.isConstant && meta.typing.mustBeType === 'string') {
                  rule('A concat of empty string with a value known to be a string is a noop');
                  example('const foo = String(); f("" + foo);', 'const foo = String(); f(foo);');
                  before(node, parentNode);

                  ASSERT(['init', 'expression', 'right'].includes(parentProp), 'normalized code', parentProp);
                  ASSERT(parentIndex < 0, 'normalized code');

                  parentNode[parentProp] = val;

                  after(val, parentNode);
                  ++changes;
                  return;
                }
              }
            }


            const li = node.left.type === 'Identifier';
            const ri = node.right.type === 'Identifier';
            if (li || ri) {
              vlog('Checking whether `' + node.left.name + ' + ' + node.right.name + '` can be coerced');
              const pl = AST.isPrimitive(node.left);
              const pr = AST.isPrimitive(node.right);
              if (!pl || !pr) {
                const meta = fdata.globallyUniqueNamingRegistry.get(pl ? node.right.name : node.left.name);
                if (
                  meta.typing.mustBeType === 'regex' &&
                  meta.isConstant &&
                  meta.writes.length === 1 &&
                  meta.varDeclRef.node &&
                  AST.isNewRegexLit(meta.varDeclRef.node)
                ) {
                  rule('A regex that is used with `+` becomes a string');
                  example('/foo/ + 1', '"/foo/1"');
                  before(node, parentNode);

                  const finalNode = AST.primitive(String(
                    new RegExp(
                      AST.getPrimitiveValue(meta.varDeclRef.node.arguments[0]),
                      AST.getPrimitiveValue(meta.varDeclRef.node.arguments[1]),
                    )
                  ));
                  if (pl) node.right = finalNode;
                  else node.left = finalNode;

                  after(node, parentNode);
                  ++changes;
                  return;
                }
              }
            }

            break;
          }
        }

        break;
      }
      case 'CallExpression': {
        if (node.callee.type !== 'Identifier') {
          if (node.callee.type === 'MemberExpression') {
            todo('when we are still receiving method calls in typed tracked tricks?');
          }
          return;
        }

        // Only dotcall would have a context but that doesn't mean you can't do `String.prototype.toString.call(undefined, ...)`

        let callee = node.callee;
        let calleeName = callee.name;
        let args = node.arguments;
        let context = undefined;

        // For dotcall, map the call
        const isDotcall = calleeName === SYMBOL_DOTCALL;
        vlog('- is dotcall?', isDotcall);
        if (isDotcall) {
          callee = args[0];
          calleeName = callee.name
          context = args[1];
          args = args.slice(3);
        }

        const contextMustBe =
          !context
          ? false
          : AST.isPrimitive(context)
          ? AST.getPrimitiveType(context)
          : context.type === 'Identifier'
          ? fdata.globallyUniqueNamingRegistry.get(context.name)?.typing.mustBeType
          : false;
        const isContextPrimitive = PRIMITIVE_TYPE_NAMES_PREVAL.has(contextMustBe);

        if (isDotcall) {
          // Where calleeName is the apply symbol, we now need the function being applied
          const funcMeta = fdata.globallyUniqueNamingRegistry.get(calleeName);
          if (!funcMeta) {
            vlog('  - bail: could not find func meta for', [calleeName]);
            return;
          }
          vlog('  - can we convert this $dotcall to a regular call? name=', calleeName, ', constant=', funcMeta.isConstant, ', builtin=', funcMeta.isBuiltin, ', builtin+this=', BUILTIN_FUNC_NO_CTX.has(calleeName));
          if (
            calleeName &&
            (
              (funcMeta.isConstant && funcMeta.varDeclRef.node.type === 'FunctionExpression' && !funcMeta.varDeclRef.node.$p.thisAccess) ||
              (funcMeta.isBuiltin && BUILTIN_FUNC_NO_CTX.has(calleeName))
            )
          ) {
            vlog('  - yes, queued transform to eliminate .apply');
            ++changes;
            // The transform is a little more subtle since excessive args should also be placed as statements
            queue.push({
              index: blockIndex,
              func: () => {
                rule('When a function does not use `this`, an dotcall can be a regular call');
                example('$dotCall($Number_parseInt, x, `f`, `200`, 15)', 'x; parseInt("200", 15)');
                before(blockBody[blockIndex]);

                const ctxt = AST.cloneSimple(context);
                const finalNode = AST.callExpression(calleeName, args.slice(0));
                if (parentIndex < 0) parentNode[parentProp] = finalNode;
                else parentNode[parentProp][parentIndex] = finalNode;

                blockBody.splice(
                  blockIndex,
                  0,
                  AST.expressionStatement(ctxt || AST.identifier('undefined')),
                  // These are unused args to .apply(), which only uses the first arg
                  ...args.map((n) => AST.expressionStatement(
                    n.type === 'SpreadElement'
                      ? AST.arrayExpression([AST.spreadElement(AST.cloneSimple(n.argument))])
                      : AST.cloneSimple(n)
                  )),
                );

                after(blockBody.slice(blockIndex, blockIndex + args.length + 2));
              },
            });
            return;
          } else {
            vlog('  - no.');
          }
        }
        vlog('  - running', [calleeName], 'through builtins list...'); // :)

        // TODO: move this to normalization...
        switch (calleeName) {
          case SYMBOL_DOTCALL: {
            ASSERT( false, 'Should not find dotcall here because that can only mean dotcall is calling dotcall', node);
            break;
          }
          case BUILTIN_REST_HANDLER_NAME: {
            // Resolve object spread in some cases
            break;
          }
          case 'eval': {
            // Even more difficult than Function because of direct eval stuffs
            vlog('Skipping eval()');
            break;
          }
          case symbo('array', 'concat'): {
            // We can do this provided we can determine the concrete value of all elements of the array
            // See the 'shift' case in arr_mutation
            break;
          }
          case symbo('array', 'flatMap'): {
            if (isDotcall) {
              // This is a whole other level due to the callback.
              if (args.length === 0) {
                todo('support $array_flatmap without arguments');
              } else {
                todo('support $array_flatmap with arguments?');
              }
            }
            break;
          }
          case symbo('array', 'includes'): {
            if (isDotcall && context) {
              if (parentNode.type === 'ExpressionStatement' && args.every(anode => anode.type !== 'SpreadElement')) {
                // The first arg is not coerced. The second arg is coerced to number. Rest is ignored.
                // It's doing the same as strict eq so the comparison itself is not observable
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('Calling .includes on an array as statement is moot1');
                    example('arr.includes(x, y, z);', 'arr; x; $coerce(y, "string"); z;');
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(context), // Note: arr elements are evaluated before the call args
                      ...args.map((anode,i) => {
                        if (i === 1) {
                          return AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]));
                        } else {
                          return AST.expressionStatement(anode)
                        }
                      }),
                    );

                    after(blockBody.slice(blockIndex, blockIndex+args.length));
                  },
                });
                changes += 1;
                return;
              } else {
                todo(`type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: ${calleeName}`);
              }
            }
            break;
          }
          case symbo('array', 'join'): {
            // We can do this provided we can determine the concrete value of all elements of the array
            // See the 'join' case in arr_mutation
            break;
          }
          case symbo('array', 'push'): {
            // We can do this provided we can determine the concrete value of all elements of the array
            // See the 'push' case in arr_mutation
            break;
          }
          case symbo('array', 'reverse'): {
            // See the 'reverse' case in arr_mutation
            // Here we only deal with the fact that .reverse() returns its context
            // Don't do it when the call is already an expression statement
            if (
              isDotcall &&
              parentNode.type !== 'ExpressionStatement' &&
              context
            ) {
              queue.push({
                index: blockIndex,
                func: () => {
                  rule('Calling .reverse on an array returns the array itself');
                  example('const y = arr.reverse();', 'arr.reverse(); const y = arr;');
                  before(blockBody[blockIndex]);

                  // .reverse() returns the array it mutated so we should be able to leave the context

                  // Rare case where grandNode does not suffice; we need the parent of the grand node to replace the whole call.
                  // In normalized code this can only be three things: expr stmt call, expr stmt assign call, var decl init call

                  // Replace the call with the `arr` of `arr.reverse()`
                  const newNode = AST.cloneSimple(context);
                  if (parentIndex < 0) parentNode[parentProp] = newNode;
                  else parentNode[parentProp][parentIndex] = newNode;
                  // Turn the arr.reverse() call into its own statement now, before where the call happens (although that should not matter much)
                  blockBody.splice(blockIndex, 0, AST.expressionStatement(node));

                  before(blockBody[blockIndex]);
                  before(blockBody[blockIndex+1]);
                },
              });
              changes += 1;
              return;
            }

            break;
          }
          case symbo('array', 'shift'): {
            // We can do this provided we can determine the concrete value of all elements of the array
            // See the 'shift' case in arr_mutation
            break;
          }
          case symbo('array', 'splice'): {
            // We can do this provided we can determine the concrete value of all elements of the array
            // See the 'splice' case in arr_mutation
            break;
          }
          case symbo('array', 'toString'): {
            // We can do this provided we can determine the concrete value of all elements of the array
            // See the 'toString' case in arr_mutation
            break;
          }
          case symbo('array', 'unshift'): {
            // We can do this provided we can determine the concrete value of all elements of the array
            // See the 'unshift' case in arr_mutation
            break;
          }
          case symbo('boolean', 'toString'): {
            // - `true.toString()`
            // - `false.toString()`
            // - `x.toString()` with x an unknown boolean
            // - `Boolean.prototype.toString.call(x)`

            if (isDotcall) {
              // Context must be a boolean.
              if (isContextPrimitive) {
                if (AST.isBoolean(context)) {
                  const primValue = AST.getPrimitiveValue(context);
                  ASSERT(typeof primValue === 'boolean', 'any primValue type other than boolean will trigger an error here which is why we checked', context);
                  let outcome = Boolean.prototype.toString.call(primValue);

                  const newNode = AST.primitive(outcome);

                  vlog('Queued something...');
                  // Call Boolean.prototype.toString on the context
                  const rest = args.slice(0);
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rule('Calling bool.toString() on a primitive should inline the call');
                      example('true.toString()', '"true"');
                      before(blockBody[blockIndex]);

                      if (parentIndex < 0) parentNode[parentProp] = newNode;
                      else parentNode[parentProp][parentIndex] = newNode;
                      rest.forEach(arg => {
                        if (arg.type === 'SpreadElement') {
                          blockBody.splice(blockIndex, 0, AST.expressionStatement(AST.arrayExpression([arg])));
                        } else {
                          blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                        }
                      });

                      after(blockBody.slice(blockIndex, blockIndex + rest.length + 1));
                      changes += 1;
                    },
                  });
                  return;
                } else {
                  vlog('- bail: context is a boolean but we dont know which way');
                  todo('calling bool_tostring on a non-bool can be predicted to throw');
                }
              } else {
                vlog('- bail: dunno if the context is a primitive alone, alone alone a boolean');
              }
            } else {
              // This will lead to an error since the context won't be bool... Note that you can call
              // it on a Boolean instance, including the Boolean constructor and its prototype...
              todo('calling bool.tostring without context will crash');
            }
            if (args.length > 0) {
              queue.push({
                index: blockIndex,
                func: () => {
                  // This function accepts no arguments so just move them out
                  rule('Args for bool.toString() are ignored so move them');
                  example('true.toString(a, b);', 'a; b; true.toString();');
                  before(blockBody[blockIndex]);

                  blockBody.splice(blockIndex, 0,
                    ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode))
                  );
                  node.arguments.length = isDotcall ? 3 : 0;

                  after(blockBody[blockIndex]);

                  changes += 1;
                }
              });
              return;
            }
            break;
          }
          case symbo('buffer', 'toString'): {
            // This is a common obfuscator trick to just do `Buffer.from(x, 'base64').toString('ascii')`
            // There are other variations we can support here and I suppose if the conversion is really that simple, we can just resolve it regardless.

            // Start by confirming that the buffer was created with a literal string.
            if (isDotcall && context?.type === 'Identifier') {
              const bufMeta = fdata.globallyUniqueNamingRegistry.get(context.name);
              if (bufMeta.isConstant && bufMeta.writes[0]?.kind === 'var' && bufMeta.writes[0].parentNode.kind === 'const') {
                const write = bufMeta.writes[0];
                const init = write.parentNode.init;
                if (
                  init.type === 'CallExpression' &&
                  init.callee.type === 'Identifier' &&
                  init.callee.name === symbo('Buffer', 'from') &&
                  init.arguments.length > 0 &&
                  AST.isStringLiteral(init.arguments[0]) &&
                  // Remaining args are literals as well
                  init.arguments.every(anode => AST.isPrimitive(anode)) &&
                  // Same for toString
                  args.every(anode => AST.isPrimitive(anode))
                ) {
                  // I think we should be able to convert this, regardless of the other args:
                  // We have:
                  // - a `buffer.toString()` call on a value we know to be a buffer
                  // - the buffer var is a constant
                  // - the buffer var was initialized through Buffer.from() with a string literal as first arg
                  // - all args for the Buffer.from and buf.toString calls are primitives
                  // The encoding args as well as remaining args as well as toString encoding arg should not matter, I think

                  rule('Buffer.from().toString() can be resolved when args are all primitives');
                  example(
                    'const a = Buffer.from("hello, world", "base64"); const b = a.toString("ascii"); $(b);',
                    '$("hello, world");'
                  );
                  before(write.blockBody[write.blockIndex]);
                  before(blockBody[blockIndex]);

                  const initArgValues = init.arguments.map(anode => AST.getPrimitiveValue(anode));
                  const tosArgValues = args.map(anode => AST.getPrimitiveValue(anode));

                  const result = Buffer.from(...initArgValues).toString(...tosArgValues);
                  // Now eliminate that call expression. We have to go the hard way because it goes one level beyond the grandNode
                  if (blockBody[blockIndex].type === 'VarStatement') {
                    blockBody[blockIndex].init = AST.primitive(result);
                  } else if (blockBody[blockIndex].type === 'ExpressionStatement') {
                    if (blockBody[blockIndex].expression.type === 'AssignmentExpression') {
                      blockBody[blockIndex].expression.right = AST.primitive(result);
                    } else {
                      blockBody[blockIndex].expression = AST.identifier('undefined');
                    }
                  } else {
                    ASSERT(false, 'in normalized code, a call must be a var init, assign rhs, or statement', blockBody[blockIndex]);
                  }

                  after(write.blockBody[write.blockIndex]);
                  after(blockBody[blockIndex]);

                  ++changes;
                  return;
                }
              }
            }
            break;
          }
          case 'Function': {
            if (isDotcall) {
              // Context is ignored. Replace with regular call
              rule('Doing dotcall on `Function` is moot because it ignores the context');
              example('$dotcall(Function, a, "b", c)', 'Function(b, c)');
              before(blockBody[blockIndex]);

              node.callee = AST.cloneSimple(node.arguments[0]);

              // Mark all args as tainted, just in case.
              // We should not need to taint Function and $dotCall metas for this.
              args.forEach((enode, i) => {
                if (enode.type === 'Identifier') {
                  taint(enode, fdata);
                }
                else if (enode.type === 'SpreadElement') {
                  taint(enode.argument, fdata);
                }
              });

              node.arguments.splice(0, 3); // Drop `Function`, the context ref, and the prop name

              after(blockBody[blockIndex]);
              ++changes;
              return;
            }
            // TODO: if the arg is a string, we could generate a function from it? Dunno if that's gonna break anything :)

            break;
          }
          case symbo('function', 'apply'): {
            if (isDotcall) {
              // Where calleeName is the apply symbol, we now need the function being applied
              const contextName = context?.name;
              const objMeta = fdata.globallyUniqueNamingRegistry.get(contextName);
              vlog('Can we convert this .apply() to a regular call?', contextName, objMeta.isConstant, objMeta.isBuiltin);
              if (
                context?.type === 'Identifier' &&
                (objMeta.isConstant && !objMeta.varDeclRef.node.$p.thisAccess) ||
                (objMeta.isBuiltin && BUILTIN_FUNC_NO_CTX.has(contextName)) ||
                // Or if the context is known to be a function, it should be fine to fold it up since $dotcall is essentially doing .call()
                BUILTIN_SYMBOLS.get(contextName)?.typings.mustBeType === 'function'
              ) {
                vlog('Queued transform to eliminate .apply');
                ++changes;
                // The transform is a little more subtle since excessive args should also be placed as statements
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('When a function does not use `this`, an `.apply` can be a regular call');
                    example('function f(){} f.apply(ctxt, arr, B, C);', 'function f(){} ctxt; arr; B; C; f(...arr);');
                    before(blockBody[blockIndex]);

                    const args = node.arguments;
                    args.shift(); // This should be $function_apply
                    const funcNameNode = args.shift(); // This should be the actual function name to call
                    args.shift(); // This should be the propname or undefined (ignore)
                    const newCtxtNode = args.shift(); // This would be the actual context of the call
                    const argsArrNode = args.shift() || AST.arrayExpression(); // The arr arg is optional

                    if (newCtxtNode?.type === 'Identifier' && newCtxtNode.name === 'undefined') {
                      // The call has undefined as context. This may as well be a regular call.
                      // Reflection aside (proxy etc), there's no way to distinguish a regular call from .apply with undefined
                      node.callee = funcNameNode;
                      // The rest of the args should be injected as a statement. They are ignored by .apply()
                      node.arguments = [
                        AST.spreadElement(argsArrNode)
                      ];
                    } else {
                      // The rest of the args should be injected as a statement. They are ignored by .apply()
                      node.arguments = [
                        funcNameNode,
                        newCtxtNode,
                        AST.undef(),
                        AST.spreadElement(argsArrNode)
                      ];
                    }

                    blockBody.splice(
                      blockIndex,
                      0,
                      ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode))
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length));
                  },
                });

                return;
              }
            } else {
              // Calling `Function.prototype.apply` directly is a weird error.
              // - `const t = Function.prototype.apply; t()` -> `t is not a function` (but `typeof t` is "function")
              // Ignore.
            }
            break;
          }
          case symbo('function', 'call'): {
            if (isDotcall) {
              // Where calleeName is the call symbol, we now need the function being called
              const contextName = context?.name;
              const objMeta = fdata.globallyUniqueNamingRegistry.get(contextName);
              vlog('Can we convert this .call() to a regular call?', calleeName, contextName, objMeta.isConstant, objMeta.isBuiltin, context?.type);
              if (
                context?.type === 'Identifier' &&
                (objMeta.isConstant && !objMeta.varDeclRef.node.$p.thisAccess) ||
                (objMeta.isBuiltin && BUILTIN_FUNC_NO_CTX.has(contextName)) ||
                // Or if the context is known to be a function, it should be fine to fold it up since $dotcall is essentially doing .call()
                BUILTIN_SYMBOLS.get(contextName)?.typings.mustBeType === 'function'
              ) {
                vlog('Queued transform to eliminate .call');
                ++changes;
                // The transform is a little more subtle since excessive args should also be placed as statements
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('When a function does not use `this`, a `.call` can be a regular call');
                    example('function f(){} f.call(ctxt, A, B, C);', 'function f(){} ctxt; f(A, B, C);');
                    example(
                      `${SYMBOL_DOTCALL}(${symbo('function', 'call')}, ${symbo('array', 'splice')}, "prop", A, B, C);`,
                      `${SYMBOL_DOTCALL}(${symbo('array', 'splice')}, A, undefined, B, C);`,
                    );
                    before(blockBody[blockIndex]);

                    node.arguments.shift(); // This should be $function_call
                    const funcNameNode = node.arguments.shift(); // This should be the actual function name to call
                    node.arguments.shift(); // This should be the propname or undefined (ignore)
                    const newCtxtNode = node.arguments.shift();

                    // The call has undefined as context. This may as well be a regular call.
                    // Reflection aside (proxy etc), there's no way to distinguish a regular call from .apply with undefined
                    if (newCtxtNode?.type === 'Identifier' && newCtxtNode.name === 'undefined') {
                      node.callee = funcNameNode;
                    } else {
                      node.arguments.unshift(AST.undef());
                      node.arguments.unshift(newCtxtNode);
                      node.arguments.unshift(funcNameNode);
                    }

                    after(blockBody[blockIndex]);
                  },
                });

                return;
              }
            } else {
              // Calling `Function.prototype.apply` directly is a weird error.
              // - `const t = Function.prototype.apply; t()` -> `t is not a function` (but `typeof t` is "function")
              // Ignore.
            }
            break;
          }
          case symbo('function', 'constructor'): {
            if (isDotcall) {
              // `(function(){}).constructor('x')` is equal to calling `Function('x')`
              // Rather than mimicking that logic here, we'll just transform it to `Function` instead and let another rule pick that up

              rule('Calling `function.constructor` should call `Function`');
              example('(function(){}).constructor("x")', 'Function("x")');
              before(blockBody[blockIndex]);

              callee.name = 'Function';

              after(blockBody[blockIndex]);
              ++changes;
              return;
            }
            break;
          }
          case symbo('function', 'toString'): {
            let targetName = context?.name;
            if (SYMBOL_TO_BUILTIN_GLOBAL_FUNCS.has(targetName)) {
              targetName = SYMBOL_TO_BUILTIN_GLOBAL_FUNCS.get(targetName);
            }

            if (isDotcall && BUILTIN_GLOBAL_FUNC_NAMES.has(targetName)) {
              rule('Calling .toString() on a global builtin function can be resolved');
              example('String.toString();', '"function String() { [native code] }";');
              before(blockBody[blockIndex]);

              const newNode = AST.primitive(`function ${targetName}() { [native code] }`)
              if (parentIndex < 0) parentNode[parentProp] = newNode;
              else parentNode[parentProp][parentIndex] = newNode;

              before(blockBody[blockIndex]);
              ++changes;
              return;
            }
            break;
          }
          case symbo('number', 'toString'): {
            // `$dotCall($number_toString, true, 'xyz'))`
            // `$dotCall($number_toString, false, 'xyz'))`
            // `$dotCall($number_toString, x, 'xyz'))`

            // Note: this will throw if context is not a number (we could make it throw here for that case)
            if (
              isDotcall &&
              contextMustBe === 'number' &&
              AST.isNumberValueNode(context) &&
              (args.length === 0 || AST.isPrimitive(args[0]))
            ) {
              if (parentNode.type === 'ExpressionStatement') {
                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('number.toString() as a statement on string can be dropped');
                    example('a.toString(b, c, d)', `a; ${SYMBOL_COERCE}(b, "number"); c; d;`);
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'charAt')}, a, undefined, b, c)`, `a; ${SYMBOL_COERCE}(b, "number");c; d;`);
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map((anode,i) =>
                        i === 0
                          ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                          : AST.expressionStatement(anode)
                      ),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });
                changes += 1;
                return;
              } else {
                const primValue = AST.getPrimitiveValue(context);

                rule('Calling number.toString() on a primitive should inline the call');
                example(`$dotCall(${symbo('number', 'toString')}, NaN, "prop")`, '"NaN"');
                before(blockBody[blockIndex]);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(primValue.toString(...args.length === 0 ? [] : [AST.getPrimitiveValue(args[0])]));
                else parentNode[parentProp][parentIndex] = AST.primitive(primValue.toString(...args.length === 0 ? [] : [AST.getPrimitiveValue(args[0])]));

                if (args.length > 1) {
                  const rest = args.slice(1);
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case 'RegExp': {
            if (isDotcall) {
              // Context is ignored. Replace with regular call
              rule('Doing .call on `RegExp` is moot because it ignores the context');
              example(SYMBOL_DOTCALL + '(RegExp, a, "xyz", b, c)', 'RegExp(b, c)');
              before(blockBody[blockIndex]);

              node.callee = AST.identifier('RegExp');
              // Mark all args as tainted, just in case.
              // We should not need to taint Function and $dotCall metas for this.
              args.forEach((enode, i) => {
                if (i === 1 || i > 3) {
                  if (enode.type === 'Identifier') {
                    taint(enode, fdata);
                  } else if (enode.type === 'SpreadElement') {
                    taint(enode.argument, fdata);
                  }
                }
              });
              node.arguments.splice(0, 3); // Drop `RegExp`, the context ref, and the prop name

              after(blockBody[blockIndex]);
              ++changes;
              return;
            }
            break;
          }
          case symbo('regex', 'constructor'): {
            if (isDotcall) {
              // -  `/foo/.constructor("bar", "g")` silliness, originated from jsf*ck
              // -> `$dotCall($regex_constructor, /foo/, "xyz", "bar", "g")`
              // -> `RegExp("bar", "g")`

              rule('Calling regex.constructor() should call the constructor directly');
              example(`$dotCall(${symbo('regex', 'constructor')}, /foo/, "xyz", ""bar", "g")`, 'RegExp("bar", "g")');
              before(blockBody[blockIndex]);

              node.arguments[0] = AST.identifier('RegExp');

              after(blockBody[blockIndex]);
              ++changes;
              return;
            }
            break;
          }
          case symbo('regex', 'test'):  {
            const ctxMeta = fdata.globallyUniqueNamingRegistry.get(context?.name);
            if (
              isDotcall &&
              context?.type === 'Identifier' &&
              ctxMeta?.isConstant &&
              ctxMeta.writes.length === 1 &&
              ctxMeta.varDeclRef.node.type === 'NewExpression' &&
              ctxMeta.varDeclRef.node.callee.type === 'Identifier' &&
              ctxMeta.varDeclRef.node.callee.name === symbo('regex', 'constructor') &&
              (!ctxMeta.varDeclRef.node.arguments[0] || AST.isPrimitive(ctxMeta.varDeclRef.node.arguments[0])) &&
              (!ctxMeta.varDeclRef.node.arguments[1] || AST.isPrimitive(ctxMeta.varDeclRef.node.arguments[1])) &&
              (args.length === 0 || AST.isPrimitive(args[0]))
            ) {
              const pattern = ctxMeta.varDeclRef.node.arguments[0] ? String(AST.getPrimitiveValue(ctxMeta.varDeclRef.node.arguments[0])) : undefined;
              const flags = ctxMeta.varDeclRef.node.arguments[1] ? String(AST.getPrimitiveValue(ctxMeta.varDeclRef.node.arguments[1])) : undefined;
              vlog('RegExp: pattern=', [pattern], ', flags=', [flags]);
              let regex;
              try {
                regex = new RegExp(pattern, flags);
              } catch (e) {
                vlog('Looks like the regex is invalid, bailing (error=', e.message, ')');
                break;
              }

              rule('regex.test when the context is a known regex and the arg is known can be resolved');
              example('/foo/.test("brafoody")', 'true');
              example('new RegExp("foo").test("brafoody")', 'true');
              example(`${SYMBOL_DOTCALL}(${symbo('regex', 'test')}, /foo/, "xyz", "brafoody")`, 'true');
              before(ctxMeta.varDeclRef.node);
              before(blockBody[blockIndex]);

              const v = args.length ? regex.test(AST.getPrimitiveValue(args[0])) : regex.test();

              if (parentIndex < 0) parentNode[parentProp] = AST.primitive(v);
              else parentNode[parentProp][parentIndex] = AST.primitive(v);

              if (args.length > 1) {
                const rest = args.slice(1);
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rest.forEach(arg => {
                      blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                    });
                  },
                });
              }

              after(blockBody[blockIndex]);
              ++changes;
              return;
            }

            break;
          }
          case symbo('String', 'fromCharCode'): {
            if (args.every(arg => AST.isPrimitive(arg))) {
              // - `String.fromCharCode(15, 33, 32)`
              // - `$dotCall($String_fromCharCode, String, "xyz", 15, 33, 32)

              rule('Calling `String.fromCharCode` on primitive args should resolve the call');
              example('String.fromCharCode(104,101,108,108,111)', '"hello"');
              example(`${SYMBOL_DOTCALL}(${symbo('String', 'fromCharCode')}, String, "xyz", 104,101,108,108,111)`, '"hello"');
              example(`${symbo('String', 'fromCharCode')}(104,101,108,108,111)`, '"hello"');
              before(blockBody[blockIndex]);

              if (parentIndex < 0) parentNode[parentProp] = AST.primitive(String.fromCharCode(...args.map(n => AST.getPrimitiveValue(n))));
              else parentNode[parentProp][parentIndex] = AST.primitive(String.fromCharCode(...args.map(n => AST.getPrimitiveValue(n))));

              after(blockBody[blockIndex]);
              ++changes;
              return;
            }
            break;
          }
          case symbo('String', 'fromCodePoint'): {
            if (args.every(arg => AST.isPrimitive(arg))) {
              // - `String.fromCodePoint(15, 33, 32)`
              // - `$dotCall($String_fromCodePoint, String, "xyz", 15, 33, 32)

              rule('Calling `String.fromCodePoint` on primitive args should resolve the call');
              example('String.fromCodePoint(104,101,108,108,111)', '"hello"');
              example(`${SYMBOL_DOTCALL}(${symbo('String', 'fromCodePoint')}, String, "xyz", 104,101,108,108,111)`, '"hello"');
              example(`${symbo('String', 'fromCodePoint')}(104,101,108,108,111)`, '"hello"');
              before(blockBody[blockIndex]);

              if (parentIndex < 0) parentNode[parentProp] = AST.primitive(String.fromCodePoint(...args.map(n => AST.getPrimitiveValue(n))));
              else parentNode[parentProp][parentIndex] = AST.primitive(String.fromCodePoint(...args.map(n => AST.getPrimitiveValue(n))));

              after(blockBody[blockIndex]);
              ++changes;
              return;
            }
            break;
          }
          case symbo('string', 'charAt'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.charAt
              // Context is coerced to string, except it will throw for null and undefined.
              // That makes this a little mor

              if (!isContextPrimitive || !['boolean', 'number', 'string'].includes(contextMustBe)) {
                vlog('- bail: context is not known to be a primitive at all');
                todo('coerce the context of string.charAt to a string first');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // Since we know the context is a bool, num, or string, we can safely proceed to eliminate this statement.

                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('string.charAt() as a statement on bool/num/str can be dropped');
                    example('a.charAt(b, c, d)', `a; ${SYMBOL_COERCE}(b, "number"); c; d;`);
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'charAt')}, a, undefined, b, c)`, `a; ${SYMBOL_COERCE}(b, "number");c; d;`);
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map((anode,i) =>
                        i === 0
                          ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                          : AST.expressionStatement(anode)
                      ),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });
                changes += 1;
                return;
              }
              else if (
                AST.isStringLiteral(context, true) &&
                (args.length === 0 || AST.isPrimitive(args[0]))
              ) {
                // 'foo'.charAt(0)

                rule('Calling `charAt` on a string with primitive args should resolve the call');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'charAt')}, "hello, world", "prop", 7, 20, $)`, '20; $, "w"');
                before(blockBody[blockIndex]);

                const ctxString = AST.getPrimitiveValue(context);
                const newArgs = [];
                if (args[0]) newArgs.push(AST.getPrimitiveValue(args[0]));
                const rest = args.slice(1);
                const result = ctxString.charAt(...newArgs);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'charCodeAt'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.charCodeAt
              // Context is coerced to string, except it will throw for null and undefined.
              // That makes this a little mor

              if (!isContextPrimitive || !['boolean', 'number', 'string'].includes(contextMustBe)) {
                // If it's a primitive then we just don't know what the value is. Otherwise we can at least coerce it to a string.
                if (!isContextPrimitive) {
                  todo(`Support string.charCodeAt when the object is not a string literal`);
                }
              }
              else if (!(args.length === 0 || AST.isPrimitive(args[0]))) {
                todo(`Support string.charCodeAt when the arg is not a string literal`);
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // Since we know the context is a bool, num, or string, we can safely proceed to eliminate this statement.

                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('string.charCodeAt() as a statement on bool/num/str can be dropped');
                    example('a.charCodeAt(b, c, d)', `a; ${SYMBOL_COERCE}(b, "number"); c; d;`);
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'charCodeAt')}, a, undefined, b, c)`, `a; ${SYMBOL_COERCE}(b, "number");c; d;`);
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map((anode,i) =>
                        i === 0
                        ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                        : AST.expressionStatement(anode)
                      ),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });
                changes += 1;
                return;
              }
              else {
                // - `'foo'.charCodeAt(0)`
                // - `$dotCall($strin_charCodeAt, 'foo', "prop", 0)`

                rule('Calling `charCodeAt` on a string with primitive args should resolve the call');
                example('"hello, world".charCodeAt(7, a, b)', '20; a, b');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'charCodeAt')}, "hello, world", "prop", 7)`, '20; $, "w"');
                before(blockBody[blockIndex]);

                const ctxValue = AST.getPrimitiveValue(context);
                const rest = args.slice(1);
                // Note: use .call because it may not be a string!
                const result = String.prototype.charCodeAt.call(ctxValue, AST.getPrimitiveValue(args[0]));

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'codePointAt'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.codePointAt
              // Context is coerced to string, except it will throw for null and undefined.
              // That makes this a little mor

              if (!isContextPrimitive || !['boolean', 'number', 'string'].includes(contextMustBe)) {
                // If it's a primitive then we just don't know what the value is. Otherwise we can at least coerce it to a string.
                if (!isContextPrimitive) {
                  todo(`Support string.codePointAt when the object is not a string literal`);
                }
              }
              else if (!(args.length === 0 || AST.isPrimitive(args[0]))) {
                todo(`Support string.codePointAt when the arg is not a string literal`);
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // Since we know the context is a bool, num, or string, we can safely proceed to eliminate this statement.

                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('string.codePointAt() as a statement on bool/num/str can be dropped');
                    example('a.codePointAt(b, c, d)', `a; ${SYMBOL_COERCE}(b, "number"); c; d;`);
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'codePointAt')}, a, undefined, b, c)`, `a; ${SYMBOL_COERCE}(b, "number");c; d;`);
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map((anode,i) =>
                        i === 0
                        ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                        : AST.expressionStatement(anode)
                      ),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });
                changes += 1;
                return;
              }
              else {
                // - `'foo'.codePointAt(0)`
                // - `$dotCall($strin_codePointAt, 'foo', "prop", 0)`

                rule('Calling `codePointAt` on a string with primitive args should resolve the call');
                example('"hello, world".codePointAt(7)', '20; $, "w"');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'codePointAt')}, "hello, world", "prop", 7)`, '20; $, "w"');
                before(blockBody[blockIndex]);

                const ctxValue = AST.getPrimitiveValue(context);
                const rest = args.slice(1);
                // Note: use .call because it may not be a string!
                const result = String.prototype.codePointAt.call(ctxValue, AST.getPrimitiveValue(args[0]));

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'concat'): {
            // Calling .concat() on a known string/num/bool is equal to `${context}${arg1}${arg2}${etc}`
            // So if we know the number of args, not a splat, then we can transform this to a template

            // Note: context does not need to be a string. It will be coerced to a string.
            if (isDotcall) {
              if (!isContextPrimitive) {
                // Transform into a coerce?
                todo('type tracked trick of string concat when context is non-primitive should coerce the context');
              }
              else if (!args.every(a => a.type !== 'SpreadElement')) {
                todo('Maybe support type tracked trick of string.concat with spread');
              }
              else {
                rule('Calling `.concat` on a primitive should change the call expression into a template');
                example('"add".concat(a, "b", 200)', '`${"add"}${a}${"b"}${200}`');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'concat')}, "add", "prop", a, "b", 200)`, '`${"add"}${a}${"b"}${200}`');
                before(blockBody[blockIndex]);

                const newNode = AST.templateLiteral(
                  ['', ''].concat(args.map(_ => '')), // TWo more string than args; the context is the base case
                  [context].concat(args), // The context and each arg becomes a quasi
                );

                if (parentIndex < 0) parentNode[parentProp] = newNode;
                else parentNode[parentProp][parentIndex] = newNode;

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'includes'): {
            vlog('  - checking dotcall=', isDotcall, ', context=', context?.type, ', and if its a string:', AST.isStringLiteral(context, true), contextMustBe);
            if (isDotcall) {
              if (!isContextPrimitive) {
                vlog('- bail: context is not known to be a primitive at all');
                todo('coerce the context of string.includes to a string first');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                vlog('  - transform queued to eliminate expr stmt');
                // The first arg is coerced to string. The second arg is coerced to number. Rest is ignored.
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('Calling .includes on an array as statement is moot2');
                    example('str.includes(x, y, z);', 'str; x; $coerce(y, "string"); z;');
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, str, "prop", x, y, z);`, 'str; x; $coerce(y, "string"); z;');
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(context),
                      ...args.map((anode,i) => {
                        if (i === 0) {
                          return AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('string')]));
                        } else if (i === 1) {
                          return AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]));
                        } else {
                          return AST.expressionStatement(anode)
                        }
                      })
                    );

                    after(blockBody.slice(blockIndex, blockIndex+args.length));
                  },
                });
                changes += 1;
                return;
              }
              else if (!AST.isPrimitive(context)) {
                // Need concrete value so check if primitive node
                vlog('- bail: context is not a primitive node so we cant resolve it');
              }
              else {
                // Okay now we have three cases:
                // - No args: change the first arg to the string "undefined", no second arg
                // - One arg: if it's a string lit, resolve it. If it's a string ident, ignore it. Otherwise coerce it to string.
                // - Two args: Same as with one arg except also; resolve it when num lit, coerce index to number when not a number.
                if (args.length === 0) {
                  rule('Calling string.includes() without args should call it with the string "undefined"');
                  example('str.includes()', 'str.includes("undefined")');
                  example(
                    `${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, str, "prop")`,
                    `${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, str, "prop", "undefined")`,
                  );
                  before(blockBody[blockIndex]);

                  node.arguments.push(AST.primitive("undefined"));

                  after(blockBody[blockIndex]);
                  changes += 1;
                  return;
                }
                else if (args.length === 1) {
                  // The context is a primitive node
                  // The arg is either a string literal, an ident mustbe string, and otherwise we coerce it to a string
                  const arg = args[0];
                  if (AST.isStringLiteral(arg)) {
                    queue.push({
                      index: blockIndex,
                      func: () => {
                        rule('Calling string.includes() with a string primitive should resolve');
                        example('"foobar".includes("1")', 'false');
                        example('"foo1bar".includes("1")', 'true');
                        example(`${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, "foobar", "prop", "1")`, 'false');
                        example(`${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, "foo1bar", "prop", "1")`, 'true');
                        before(blockBody[blockIndex]);

                        const ctxValue = AST.getPrimitiveValue(context);
                        const argValue = AST.getPrimitiveValue(arg);
                        // Note: use .call because the context may not be a string
                        const bool = String.prototype.includes.call(ctxValue, argValue);

                        const newNode = AST.primitive(bool);
                        if (parentIndex < 0) parentNode[parentProp] = newNode;
                        else parentNode[parentProp][parentIndex] = newNode;

                        after(newNode);
                        after(blockBody[blockIndex]);
                      }
                    });
                    changes += 1;
                    return;
                  }
                  else if (
                    AST.isPrimitive(arg) ||
                    (arg.type === 'Identifier' && shouldCoerceIdentToString(fdata.globallyUniqueNamingRegistry.get(arg.name)))
                  ) {
                    // Just coerce to string. Take the lazy route.
                    queue.push({
                      index: blockIndex,
                      func: () => {
                        rule('Calling string.includes(x) with a non-string primitive should have its arg coerced to string');
                        example('"foobar".includes(1)', 'const tmp = $coerce(1, "string"); "foobar".includes(tmp)');
                        example(
                          `${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, "foobar", "prop", 1)`,
                          `const tmp = $coerce(1, "string"); ${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, "foobar", "prop", tmp)`,
                        );
                        before(blockBody[blockIndex]);

                        const tmp = createFreshVar('tmpttr', fdata);
                        const newNode = AST.varStatement('const', tmp, AST.callExpression(SYMBOL_COERCE, [arg, AST.primitive('string')]));
                        blockBody.splice(blockIndex, 0, newNode);

                        node.arguments[3] = AST.identifier(tmp);

                        after(newNode);
                        after(blockBody[blockIndex]);
                      }
                    });
                    changes += 1;
                    return;
                  }
                  else {
                    if (arg.type !== 'Identifier') {
                      todo('What arg type can .includes be?', arg.type)
                    }
                  }
                }
                else {
                  // Call has at least two args
                  // - If if first arg is string and second arg is number, resolve it
                  // - If first arg is not a string, coerce it to a string if const/builtin
                  // - If second arg is not a number, coerce it to a number if const/builtin
                  // Ignore the other cases. It is what it is.
                  const arg1 = args[0];
                  const arg2 = args[1];
                  const isStr1 = AST.isStringLiteral(arg1);
                  const isNum2 = AST.isNumberLiteral(arg2);
                  if (isStr1 && isNum2) {
                    queue.push({
                      index: blockIndex,
                      func: () => {
                        rule('Calling string.includes() with a string and number primitive should resolve');
                        example('"foo1bar".includes("1", 4)', 'false');
                        example('"foobar1".includes("1", 4)', 'true');
                        example(`${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, "foo1bar", "prop", "1", 4)`, 'false');
                        example(`${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, "foobar1", "prop", "1", 4)`, 'true');
                        before(blockBody[blockIndex]);

                        const ctxValue = AST.getPrimitiveValue(context);
                        const argstr = AST.getPrimitiveValue(arg1);
                        const argnum = AST.getPrimitiveValue(arg2);
                        // Note: use .call because the context may not be a string
                        const bool = String.prototype.includes.call(ctxValue, argstr, argnum);

                        const newNode = AST.primitive(bool);
                        if (parentIndex < 0) parentNode[parentProp] = newNode;
                        else parentNode[parentProp][parentIndex] = newNode;

                        after(newNode);
                        after(blockBody[blockIndex]);
                      }
                    });
                    changes += 1;
                    return;
                  }
                  else {
                    // Coerce arg1 to string if it's a primitive or a safe ident
                    const do1 = !isStr1 && (AST.isPrimitive(arg1) || (arg1.type === 'Identifier' && shouldCoerceIdentToString(fdata.globallyUniqueNamingRegistry.get(arg1.name))));
                    // Coerce arg2 to number if it's a primitive or a safe ident
                    const do2 = !isNum2 && (AST.isPrimitive(arg2) || (arg2.type === 'Identifier' && shouldCoerceIdentToNumber(fdata.globallyUniqueNamingRegistry.get(arg2.name))));

                    // Prevent race conditions; arg1 must be coerced before arg2, so do them in one callback
                    if (do1 || do2) {
                      queue.push({
                        index: blockIndex,
                        func: () => {
                          rule('Calling string.includes() should coerce the first two args if possible');
                          example('x.includes(a, b, c)', 'const tmp = $coerce(a, "string"); const tmp2 = $coerce(b, "number"); c; x.includes(tmp, tmp2)');
                          example(
                            `${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, x, "prop", a, b, c)`,
                            `const tmp = $coerce(a, "string"); const tmp2 = $coerce(b, "number"); c; ${SYMBOL_DOTCALL}(${symbo('string', 'includes')}, x, "prop", tmp, tmp2)`,
                          );
                          before(blockBody[blockIndex]);

                          // Do them back to front because the splice will basically unshift them

                          let n = 0;

                          if (args.length > 2) {
                            // While we're here, make sure the arg count is 2
                            blockBody.splice(blockIndex, 0, ...args.slice(2).map(anode => AST.expressionStatement(anode)));
                            n += args.length-2;
                            args.length = 2;
                          }

                          if (do2) {
                            const tmp = createFreshVar('tmpttr', fdata);
                            const newNode = AST.varStatement('const', tmp, AST.callExpression(SYMBOL_COERCE, [arg2, AST.primitive('number')]));
                            blockBody.splice(blockIndex, 0, newNode);
                            node.arguments[4] = AST.identifier(tmp);
                            n += 1;
                          }

                          if (do1) {
                            const tmp = createFreshVar('tmpttr', fdata);
                            const newNode = AST.varStatement('const', tmp, AST.callExpression(SYMBOL_COERCE, [arg1, AST.primitive('string')]));
                            blockBody.splice(blockIndex, 0, newNode);
                            node.arguments[3] = AST.identifier(tmp);
                            n += 1;
                          }

                          after(blockBody.slice(blockIndex, n + 1));
                        }
                      });
                      changes += 1;
                      return;
                    }
                  }
                }
              }
            }
            break;
          }
          case symbo('string', 'indexOf'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.indexof
              // Context is coerced to string, except it will throw for null and undefined.
              // That makes this a little more awkward for us, unfortunately.

              if (!isContextPrimitive || !['boolean', 'number', 'string'].includes(contextMustBe)) {
                vlog('- bail: context is not known to be a primitive at all');
                todo('coerce the context of string.indexOf to a string first');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // Since we know the context is a bool, num, or string, we can safely proceed to eliminate this statement.

                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('string.indexOf() as a statement on bool/num/str can be dropped');
                    example('a.indexOf(b, c, d)', `a; ${SYMBOL_COERCE}(b, "string"); ${SYMBOL_COERCE}(c, "number"); d;`);
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'indexOf')}, a, undefined, b, c)`, `a; ${SYMBOL_COERCE}(b, "string"); ${SYMBOL_COERCE}(c, "number"); d;`);
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map((anode,i) =>
                        i === 0
                        ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('string')]))
                        : i === 1
                        ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                        : AST.expressionStatement(anode)
                      ),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });
                changes += 1;
                return;
              }
              else if (
                AST.isStringLiteral(context, true) &&
                (args.length === 0 || (AST.isPrimitive(args[0]) && (args.length === 1 || AST.isPrimitive(args[1]))))
              ) {
                // - `'foo'.indexOf('o', 15)`
                // - `$dotCall($string_indexOf, 'foo', "prop", 'o', 15)`

                rule('Calling `indexOf` on a string with primitive args should resolve the call');
                example('"hello, world".indexOf("w", 4, $)', '$, 7');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'indexOf')}, "hello, world", "prop", "w", 4)`, '7');
                before(blockBody[blockIndex]);

                const ctxValue = AST.getPrimitiveValue(context);
                const newArgs = [];
                if (args[0]) newArgs.push(AST.getPrimitiveValue(args[0]));
                if (args[1]) newArgs.push(AST.getPrimitiveValue(args[1])); // I don't think arg 3+ are used?
                const rest = args.slice(2);
                // Note: use .apply because the context may not be a string
                const result = String.prototype.indexOf.apply(ctxValue, newArgs);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'lastIndexOf'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.lastIndexOf
              // Context is coerced to string, except it will throw for null and undefined.
              // That makes this a little more awkward for us, unfortunately.

              if (!isContextPrimitive || !['boolean', 'number', 'string'].includes(contextMustBe)) {
                vlog('- bail: context is not known to be a primitive at all');
                todo('coerce the context of string.lastIndexOf to a string first');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // Since we know the context is a bool, num, or string, we can safely proceed to eliminate this statement.

                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('string.lastIndexOf() as a statement on bool/num/str can be dropped');
                    example('a.lastIndexOf(b, c, d)', `a; ${SYMBOL_COERCE}(b, "string"); ${SYMBOL_COERCE}(c, "number"); d;`);
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'lastIndexOf')}, a, undefined, b, c)`, `a; ${SYMBOL_COERCE}(b, "string"); ${SYMBOL_COERCE}(c, "number"); d;`);
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map((anode,i) =>
                        i === 0
                          ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('string')]))
                          : i === 1
                            ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                            : AST.expressionStatement(anode)
                      ),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });
                changes += 1;
                return;
              }
              else if (
                AST.isStringLiteral(context, true) &&
                (args.length === 0 || (AST.isPrimitive(args[0]) && (args.length === 1 || AST.isPrimitive(args[1]))))
              ) {
                // 'foo'.lastIndexOf('o', 15)

                rule('Calling `lastIndexOf` on a string with primitive args should resolve the call');
                example('"hello, world".lastIndexOf("w", 4, $)', '$, 7');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'lastIndexOf')}, "hello, world", "prop", "w", 4, $)`, '$, 7');
                before(blockBody[blockIndex]);

                const ctxValue = AST.getPrimitiveValue(context);
                const newArgs = [];
                if (args[0]) newArgs.push(AST.getPrimitiveValue(args[0]));
                if (args[1]) newArgs.push(AST.getPrimitiveValue(args[1])); // I don't think arg 3+ are used?
                const rest = args.slice(2);
                // Note: use .apply because the context may not be a string
                const result = String.prototype.lastIndexOf.apply(ctxValue, newArgs);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'replace'): {
            if (isDotcall) {
              if (
                context &&
                AST.isStringLiteral(context, true) &&
                args.length > 1 &&
                AST.isPrimitive(args[0]) && AST.getPrimitiveType(args[0]) === 'string' &&
                AST.isPrimitive(args[1]) && AST.getPrimitiveType(args[1]) === 'string'
              ) {
                // - `'foo'.replace('bar', 'baz')`
                // - `$dotCall($string_replace, 'foo', "prop", 'bar', 'baz')`

                rule('Calling `replace` on a string with string args should resolve the call');
                example('"foo".replace("o", "a". x, y ,z)', 'x; y; z; "fao"');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'replace')}, "foo", "prop", "o", "a". x, y ,z)`, 'x; y; z; "fao"');
                before(blockBody[blockIndex]);

                const ctxString = AST.getPrimitiveValue(context);
                const rexString = AST.getPrimitiveValue(args[0]);
                const rplString = AST.getPrimitiveValue(args[1]);
                const rest = args.slice(2);
                const result = ctxString.replace(rexString, rplString);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }

              if (
                context &&
                AST.isStringLiteral(context, true)
              ) {
                const metaArg1 = args.length > 1 && args[0].type === 'Identifier' && fdata.globallyUniqueNamingRegistry.get(args[0].name);

                if (
                  metaArg1 &&
                  metaArg1.typing.mustBeType === 'regex' &&
                  metaArg1.isConstant &&
                  AST.isNewRegexLit(metaArg1.varDeclRef.node)
                ) {
                  if (!args[1] || AST.isPrimitive(args[1])) {
                    // - `'foo'.replace(/bar/)`
                    // - `'foo'.replace(/bar/, 'baz')`
                    // normalized:
                    // - `const arg = new $regex_constructor('bar', ''); $dotCall($regex_replace, 'foo', 'replace', arg);`

                    rule('Calling `replace` on a string with regex and primitive args should resolve the call');
                    example('"foo".replace(/a/g, "a")', '"faa"');
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'replace')}, "foo", "prop", /a/g, "a")`, '"faa"');
                    before(blockBody[blockIndex]);

                    const ctxString = args[1] ? AST.getPrimitiveValue(context) : undefined;
                    const regex = getRegexFromLiteralNode(metaArg1.varDeclRef.node);
                    const rplString = AST.getPrimitiveValue(args[1]);
                    const rest = args.slice(2);
                    const result = ctxString.replace(regex, rplString);

                    if (rest.length > 0) {
                      // Inject excessive args as statements
                      queue.push({
                        index: blockIndex,
                        func: () => {
                          rest.forEach(arg => {
                            blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                          });
                        },
                      });
                    }

                    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                    else parentNode[parentProp][parentIndex] = AST.primitive(result);

                    after(blockBody[blockIndex]);
                    ++changes;
                    return;
                  }

                  if (args[1]?.type === 'Identifier' && args[1].name === symbo('string', 'constructor')) {
                    // - `'foo'.replace(/bar/, $string_constructor)`

                    // Not sure, actually, but does it always just return the input string when you pass in String? :hmm:
                    rule('Calling `replace` on a string with regex and the function String should resolve the call');
                    example(`"foo".replace(/a/g, "a", ${symbo('string', 'constructor')})`, '"foo"');
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'replace')}, "foo", "prop", /a/g, ${symbo('string', 'constructor')})`, '"foo"');
                    before(blockBody[blockIndex]);

                    const ctxString = args[1] ? AST.getPrimitiveValue(context) : undefined;
                    const regex = getRegexFromLiteralNode(metaArg1.varDeclRef.node);
                    const rest = args.slice(2);
                    const result = ctxString.replace(regex, String);

                    if (rest.length > 0) {
                      // Inject excessive args as statements
                      queue.push({
                        index: blockIndex,
                        func: () => {
                          rest.forEach(arg => {
                            blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                          });
                        },
                      });
                    }

                    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                    else parentNode[parentProp][parentIndex] = AST.primitive(result);

                    after(blockBody[blockIndex]);
                    ++changes;
                    return;
                  }

                  ASSERT(args[1].type === 'Identifier', 'either an arg is a primitive or an ident when normalized', args[1].type);
                  const metaArg2 = fdata.globallyUniqueNamingRegistry.get(args[1].name);
                  if (metaArg2.isConstant && metaArg2.varDeclRef.node.type === 'FunctionExpression') {
                    // There is a (small) subclass of functions that we can support here
                    const funcNode = metaArg2.varDeclRef.node;
                    const funcBody = funcNode.body.body;
                    const bodyOffset = funcNode.$p.bodyOffset;

                    vlog('Verifying whether func arg to string.replace can be simulated, funcOffset=', bodyOffset);

                    // - simple array lookup replacer; `'abc'.replace(/b/, s => { const r = obj[s]; return r; });`
                    // - two statements;
                    //   - var decl that reads property from an object based on first arg. object must be known entirely
                    //   - return statement of that value
                    if (
                      funcBody[bodyOffset].type === 'VarStatement' &&
                      funcBody[bodyOffset].init.type === 'MemberExpression' &&
                      funcBody[bodyOffset].init.object.type === 'Identifier' &&
                      funcBody[bodyOffset].init.computed &&
                      funcBody[bodyOffset].init.property.type === 'Identifier' &&
                      // Confirm that the function starts with assigning param 0
                      funcBody[0].type === 'VarStatement' &&
                      funcBody[0].init.type === 'Param' &&
                      funcBody[0].init.name === '$$0' &&
                      // Is the property being accessed coming from the first param?
                      funcBody[0].id.name === funcBody[bodyOffset].init.property.name &&
                      // And the tail, must only be a return for that ident
                      funcBody[bodyOffset+1]?.type === 'ReturnStatement' &&
                      funcBody[bodyOffset+1].argument.type === 'Identifier' &&
                      funcBody[bodyOffset+1].argument.name === funcBody[bodyOffset].id.name &&
                      !funcBody[bodyOffset+2] // No more
                    ) {
                      // - We've verified this function; function f($$0) { const s = $$0; debugger; const r = obj[s]; return r; }`
                      // We now have to confirm that the `obj` here is fully known and only used
                      // as property access that is not the child of delete or call or assignment-lhs.
                      const objMeta = fdata.globallyUniqueNamingRegistry.get(funcBody[bodyOffset].init.object.name);
                      const objNode = objMeta.isConstant && objMeta.varDeclRef.node;
                      if (
                        objNode?.type === 'ObjectExpression' &&
                        objNode.properties.every(pnode => {
                          // - Key must be known (ident or primitive computed)
                          // - Prop must not be getter/setter
                          // - Value must be primitive
                          if (pnode.key.computed && !AST.isPrimitive(pnode.key)) return false;
                          if (pnode.kind !== 'init') return false;
                          if (!AST.isPrimitive(pnode.value)) return false;
                          return true;
                        }) &&
                        objMeta.reads.every(read => {
                          // - read parent must be member expression
                          // - read grand must not be delete or call or assignment-lhs
                          if (read.parentNode.type !== 'MemberExpression') return false;
                          if (read.grandNode.type === 'CallExpression') return false;
                          if (read.grandNode.type === 'UnaryExpression' && read.grandNode.operator === 'delete') return false;
                          if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') return false;
                          return true;
                        })
                      ) {
                        // This is `function r($$0) { const s = $$0; debugger; const r = obj[s]; return r; } 'abc'.replace(/b/, r);`
                        // And the object is a constant object literal where all the keys are known and values are primitives
                        // We should be able to apply this now. The only risk is a "regex ddos", for which we offer no real defense rn...
                        vlog('Now resolving string replacement with function callback. If this is a very evil regex things will get stuck now.');

                        const str = AST.getPrimitiveValue(context);
                        const regex = getRegexFromLiteralNode(metaArg1.varDeclRef.node);
                        const out = str.replace(regex, s => {
                          const pnode = objNode.properties.find(pnode => {
                            if (pnode.computed) {
                              // We should have asserted that all computed keys are primitives
                              return String(AST.getPrimitiveValue(pnode.key)) === s;
                            } else {
                              return pnode.key.name === s;
                            }
                          });
                          if (pnode) {
                            return AST.getPrimitiveValue(pnode.value);
                          } else {
                            return undefined;
                          }
                        });

                        rule('String replace on string with regex arg and func that is a simple obj lookup can be resolved');
                        example(
                          'const obj = {b: "x"}; function f($$0) { const s = $$0; const v = obj[s]; return v; } "abc".replace(/b/, r);',
                          'const obj = {b: "x"}; function f($$0) { const s = $$0; const v = obj[s]; return v; } "axc";',
                        );
                        example(
                          `const obj = {b: "x"}; function f($$0) { const s = $$0; const v = obj[s]; return v; } ${SYMBOL_DOTCALL}(${symbo('string', 'replace')}, "abc", "prop", /b/, r);`,
                          'const obj = {b: "x"}; function f($$0) { const s = $$0; const v = obj[s]; return v; } "axc";',
                        );
                        before(blockBody[blockIndex]);

                        if (parentIndex < 0) parentNode[parentProp] = AST.primitive(out);
                        else parentNode[parentProp][parentIndex] = AST.primitive(out);

                        after(blockBody[blockIndex]);
                        ++changes;
                        return;
                      }
                    }

                  }
                }
              }
            }

            break;
          }
          case symbo('string', 'slice'): {
            if (isDotcall) {
              if (!isContextPrimitive) {
                vlog('- bail: context is not known to be a primitive at all');
                todo('coerce the context of string.slice to a string first');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                vlog('  - transform queued to eliminate expr stmt');
                // The first arg is coerced to string. The second arg is coerced to number. Rest is ignored.
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('Calling .slice on a string as statement is moot');
                    example('str.slice(x, y, z);', 'str; x; $coerce(y, "string"); z;');
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'slice')}, str, "prop", x, y, z);`, 'str; x; $coerce(y, "string"); z;');
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(context),
                      ...args.map((anode,i) => {
                        if (i === 0) {
                          return AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]));
                        }
                        else if (i === 1) {
                          return AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]));
                        }
                        else {
                          return AST.expressionStatement(anode)
                        }
                      })
                    );

                    after(blockBody.slice(blockIndex, blockIndex+args.length));
                  },
                });
                changes += 1;
                return;
              }
              else if (
                AST.isStringLiteral(context, true) &&
                (args.length === 0 || (AST.isPrimitive(args[0]) && (args.length === 1 || AST.isPrimitive(args[1]))))
              ) {
                // 'foo'.slice(0)

                rule('Calling `slice` on a string with primitive args should resolve the call');
                example('"hello, world".slice(7, 20, $)', '$, "world"');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'slice')}, "hello, world", "prop", 7, 20, $)`, '$, "world"');
                before(blockBody[blockIndex]);

                const ctxString = AST.getPrimitiveValue(context);
                const newArgs = [];
                if (args[0]) newArgs.push(AST.getPrimitiveValue(args[0]));
                if (args[1]) newArgs.push(AST.getPrimitiveValue(args[1])); // I don't think arg 3+ are used?
                const rest = args.slice(2);
                const result = ctxString.slice(...newArgs);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'split'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.split
              // Context is coerced to string, except it will throw for null and undefined.
              // That makes this a little more awkward for us, unfortunately.
              // Furthermore, if the first arg is not nullable, it will first try to read a special
              // split function from it before falling back to string coercion.
              // So we can play ball only if we know the arg is a non-nullable primitive or regex.

              if (!isContextPrimitive || !['boolean', 'number', 'string'].includes(contextMustBe)) {
                // can't safely coerce the context because a nullable crashes but an object might not
                vlog('- bail: context is not a regex and not a bool/num/string');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // Since we know the context is a bool, num, string, or regex, we can safely proceed to eliminate this statement.
                // The second arg is coerced to number, but the first one first has
                // a method read attempt. If that succeeds, it just calls that method
                // and only otherwise will it coerce the arg. So that makes this way more
                // awkward.

                const argType =
                  (args[0] && AST.isPrimitive(args[0]) && AST.getPrimitiveType(args[0])) ||
                  (args[0]?.type === 'Identifier' && fdata.globallyUniqueNamingRegistry.get(args[0].name)?.typing.mustBeType)
                ;

                if (!args[0] || ['boolean', 'number', 'string', 'regex'].includes(argType)) {
                  vlog('- ok! First arg is not present or a bool/num/str/regex, so we can eliminate this safely...');
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rule('string.split() as a statement on bool/num/str can be dropped');
                      example('a.substr(b, c)', 'a; b; c;');
                      example(`${SYMBOL_DOTCALL}(${symbo('string', 'substr')}, a, undefined, b, c)`, 'a; b; c;');
                      before(blockBody[blockIndex]);

                      blockBody.splice(blockIndex, 1,
                        AST.expressionStatement(AST.cloneSimple(context)),
                        ...args.map((anode,i) =>
                          i === 0
                            // We've verified this is a primitive or regex; no need to coerce it. just reference it.
                            ? AST.expressionStatement(anode)
                            : i === 1
                            ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                            : AST.expressionStatement(anode)
                        ),
                      );

                      after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                    }
                  });
                }

              }
              else if (
                AST.isStringLiteral(context, true) &&
                (args.length === 0 || AST.isPrimitive(args[0]))
              ) {
                // 'foo'.split()
                // 'foo'.split('o')

                rule('Calling `split` on a string with none or a primitive arg should resolve the call');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'split')}, "hello, world", "prop", ",", $)`, '$, ["hello", " world"]');
                before(blockBody[blockIndex]);

                const ctxString = AST.getPrimitiveValue(context);
                const newArgs = [];
                if (args.length > 0) {
                  newArgs.push(AST.getPrimitiveValue(args[0]));
                }
                const rest = args.slice(1);
                const result = ctxString.split(...newArgs);

                if (parentIndex < 0) parentNode[parentProp] = AST.arrayExpression(result.map(str => AST.primitive(str)));
                else parentNode[parentProp][parentIndex] = AST.arrayExpression(result.map(str => AST.primitive(str)));

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
              else if (args.length > 0 && args[0].type === 'Identifier') {
                const metaArg1 = fdata.globallyUniqueNamingRegistry.get(args[0].name);
                if (
                  context &&
                  AST.isStringLiteral(context, true) &&
                  metaArg1 &&
                  metaArg1.typing.mustBeType === 'regex' &&
                  metaArg1.isConstant &&
                  AST.isNewRegexLit(metaArg1.varDeclRef.node)
                ) {
                  // 'foo'.split(/o/)
                  // normalized:
                  // - `const arg = new $regex_constructor('o', ''); $dotCall($regex_split, 'foo', 'split', arg);`

                  rule('Calling `split` on a string with a regex should resolve the call');
                  example('"hello, world".split(/o/g, $)', '$, ["hell", ", w", "rld"]');
                  example(`${SYMBOL_DOTCALL}(${symbo('string', 'split')}, "hello, world", "prop", /o/g, $)`, '$, ["hell", ", w", "rld"]');
                  before(blockBody[blockIndex]);

                  const ctxString = AST.getPrimitiveValue(context);
                  const regex = getRegexFromLiteralNode(metaArg1.varDeclRef.node);
                  const rest = args.slice(1);
                  const result = ctxString.split(regex);

                  if (parentIndex < 0) parentNode[parentProp] = AST.arrayExpression(result.map(str => AST.primitive(str)));
                  else parentNode[parentProp][parentIndex] = AST.arrayExpression(result.map(str => AST.primitive(str)));

                  if (rest.length > 0) {
                    // Inject excessive args as statements to preserve reference errors
                    queue.push({
                      index: blockIndex,
                      func: () => {
                        rest.forEach(arg => {
                          blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                        });
                      },
                    });
                  }

                  after(blockBody[blockIndex]);
                  ++changes;
                  return;
                }
                else {
                  if (
                    metaArg1 &&
                    metaArg1.typing.mustBeType === 'array' &&
                    metaArg1.isConstant &&
                    metaArg1.writes.length === 1 &&
                    metaArg1.reads.length === 1 && // Technically we can do more than this but this is low hanging fruit
                    metaArg1.varDeclRef.node.type === 'ArrayExpression' &&
                    metaArg1.varDeclRef.node.elements.length &&
                    metaArg1.varDeclRef.node.elements[0] &&
                    (
                      // If it _is_ a string, that's cool
                      AST.isStringLiteral(metaArg1.varDeclRef.node.elements[0]) ||
                      ( // If we know the arg mustbea string, that's fine too
                        metaArg1.varDeclRef.node.elements[0].type === 'Identifier' &&
                        fdata.globallyUniqueNamingRegistry.get(metaArg1.varDeclRef.node.elements[0].name)?.typing?.mustBeType === 'string'
                      )
                    )
                  ) {
                    // `foo`.split(['bar'])
                    // `foo`.split([bar])  (with bar a known string)
                    //
                    // (This can be found after doing `foo`.split`bar` because the tagged template will pass in ['bar'] as an array)
                    // Split will coerce the arg to a string, if it exists, but it has a caveat where it will first check for
                    // Symbol.split and if it's undefined then behavior is different as well.

                    rule('Calling `split` on a string with an array with a string is like calling split with a string');
                    example('const arr = ["x"]; "axbxc".split(arr)', 'const arr = "x"; "axbxc".split(arr)');
                    example('const arr = [x]; "axbxc".split(arr)', 'const arr = x; "axbxc".split(arr)'); // with x mustbe string
                    example(`const arr = ["x"]; ${SYMBOL_DOTCALL}(${symbo('string', 'split')}, "axbxc", "prop", arr)`, `const arr = "x"; ${SYMBOL_DOTCALL}(${symbo('string', 'split')}, "axbxc", "prop", arr)`);
                    example(`const arr = [x]; ${SYMBOL_DOTCALL}(${symbo('string', 'split')}, "axbxc", "prop", arr)`, `const arr = x; ${SYMBOL_DOTCALL}(${symbo('string', 'split')}, "axbxc", "prop", arr)`); // with x mustbe string
                    before(blockBody[blockIndex]);
                    before(metaArg1.varDeclRef.varDeclNode);

                    ASSERT(metaArg1.varDeclRef.varDeclNode.type === 'VarStatement', 'not assign or anything because write.len===1, right?', metaArg1.varDeclRef);

                    metaArg1.varDeclRef.varDeclNode.init = metaArg1.varDeclRef.node.elements[0];

                    after(metaArg1.varDeclRef.varDeclNode);
                    after(blockBody[blockIndex]);

                    ++changes;
                    return;
                  }
                }
              }
            }
            break;
          }
          case symbo('string', 'substr'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-string.prototype.substr
              // Context is coerced to string, except it will throw for null and undefined.
              // That makes this a little more awkward for us, unfortunately.

              if (!isContextPrimitive || !['boolean', 'number', 'string'].includes(contextMustBe)) {
                vlog('- bail: context is not known to be a primitive or an unknown primitive or a nullable', isContextPrimitive, contextMustBe);
                todo('coerce the context of string.substr to a string first, but consider the nullable edge case');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // Since we know the context is a bool, num, or string, we can safely proceed to eliminate this statement.

                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('string.substr() as a statement on bool/num/str can be dropped');
                    example('a.substr(b, c)', 'a; b; c;');
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'substr')}, a, undefined, b, c)`, 'a; b; c;');
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map((anode,i) =>
                        i < 2
                          ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                          : AST.expressionStatement(anode)
                      ),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });
                changes += 1;
                return;
              }
              else if (
                AST.isStringLiteral(context, true) &&
                (args.length === 0 || (AST.isPrimitive(args[0]) && (args.length === 1 || AST.isPrimitive(args[1]))))
              ) {
                // - `'foo'.substr()`
                // - `'foo'.substr(0)`
                // - `'foo'.substr(0, 1)`

                rule('Calling `substr` on a string with primitive args should resolve the call');
                example('"hello, world".substr(7, 20, $)', '$, "world"');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'substr')}, "hello, world", "prop", 7, 20, $)`, '$, "world"');
                before(blockBody[blockIndex]);

                const ctxString = AST.getPrimitiveValue(context);
                const newArgs = [];
                if (args[0]) newArgs.push(AST.getPrimitiveValue(args[0]));
                if (args[1]) newArgs.push(AST.getPrimitiveValue(args[1])); // I don't think arg 3+ are used?
                const rest = args.slice(2);
                const result = ctxString['substr'](...newArgs);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'substring'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/text-processing.html#sec-stringpad
              // Context is coerced to string, except it will throw for null and undefined.
              // That makes this a little more awkward for us, unfortunately.

              if (!isContextPrimitive || !['boolean', 'number', 'string'].includes(contextMustBe)) {
                vlog('- bail: context is not known to be a primitive or an unknown primitive or a nullable', isContextPrimitive, contextMustBe);
                todo('coerce the context of string.substring to a string first, but consider the nullable edge case');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // Since we know the context is a bool, num, or string, we can safely proceed to eliminate this statement.

                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('string.substring() as a statement on bool/num/str can be dropped');
                    example('a.substring(b, c)', 'a; b; c;');
                    example(`${SYMBOL_DOTCALL}(${symbo('string', 'substring')}, a, undefined, b, c)`, 'a; b; c;');
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map((anode,i) =>
                        i < 2
                        ? AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]))
                        : AST.expressionStatement(anode)
                      ),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });
                changes += 1;
                return;
              }
              else if (
                AST.isStringLiteral(context, true) &&
                (args.length === 0 || (AST.isPrimitive(args[0]) && (args.length === 1 || AST.isPrimitive(args[1]))))
              ) {
                // - `'foo'.substring()`
                // - `'foo'.substring(0)`
                // - `'foo'.substring(0, 1)`

                rule('Calling `substring` on a string with primitive args should resolve the call');
                example('"hello, world".substring(7, 20, $)', '$, "world"');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'substring')}, "hello, world", "prop", 7, 20, $)`, '$, "world"');
                before(blockBody[blockIndex]);

                const ctxString = AST.getPrimitiveValue(context);
                const newArgs = [];
                if (args[0]) newArgs.push(AST.getPrimitiveValue(args[0]));
                if (args[1]) newArgs.push(AST.getPrimitiveValue(args[1])); // I don't think arg 3+ are used?
                const rest = args.slice(2);
                const result = ctxString.substring(...newArgs);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          case symbo('string', 'valueOf'): {
            if (isDotcall) {
              // https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.valueof
              // Basically, if the context is a string, return the string.
              // If the context has a special "StringData" thing. Do the thing. (*magic happens*)
              // Otherwise throw an error.
              // Note: that StringData is only set on `new String` instances and String.prototype
              //       (where it is the empty string). Gnarly edge cases but at least contained?
              //       Note that String may be extended by a class so it kind of gets lost there.

              if (!isContextPrimitive) {
                // This is being called on a non-string. It should not be coerced. It will
                // do the StringData thing or die. But we can't reliably infer that here.
                vlog('- bail: context is not known to be a primitive at all');
              }
              else if (contextMustBe !== 'string') {
                // We can't reliably do anything here so just bail.
                vlog('- bail: context is not known to be a string');
              }
              else if (!args.every(anode => anode.type !== 'SpreadElement')) {
                vlog('- bail: at least one arg was a spread');
              }
              else if (parentNode.type === 'ExpressionStatement') {
                // It was a valueOf on a string value as a statement.
                // Map it and the args to expression statements and call it a day.

                vlog('- ok! queued the removal of this statement');
                queue.push({
                  index: blockIndex,
                  func: () => {
                    rule('string.valueOf() as a statement can be dropped');
                    example('"xyz".valueOf(a, b)', 'a; b;');
                    before(blockBody[blockIndex]);

                    blockBody.splice(blockIndex, 1,
                      AST.expressionStatement(AST.cloneSimple(context)),
                      ...args.map(anode => AST.expressionStatement(anode)),
                    );

                    after(blockBody.slice(blockIndex, blockIndex + args.length + 1));
                  }
                });

                changes += 1;
                return;
              }
              else if (AST.isStringLiteral(context, true)) {
                // - `'foo'.valueOf()`

                rule('Calling `valueOf` on a string should resolve to the string');
                example('"hello, world".valueOf(7, 20, $)', '"hello, world"; 7; 20; $');
                example(`${SYMBOL_DOTCALL}(${symbo('string', 'valueOf')}, "hello, world", "prop", 7, 20, $)`, '"hello, world"; 7; 20; $');
                before(blockBody[blockIndex]);

                const ctxString = AST.getPrimitiveValue(context);
                const newArgs = [];
                if (args[0]) newArgs.push(AST.getPrimitiveValue(args[0]));
                if (args[1]) newArgs.push(AST.getPrimitiveValue(args[1])); // I don't think arg 3+ are used?
                const rest = args.slice(2);
                const result = ctxString.substring(...newArgs);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                if (rest.length > 0) {
                  // Inject excessive args as statements to preserve reference errors
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                    },
                  });
                }

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }
          // Legacy HTML-related String.prototype methods
          case symbo('string', 'anchor'):
          case symbo('string', 'big'):
          case symbo('string', 'blink'):
          case symbo('string', 'bold'):
          case symbo('string', 'fixed'):
          case symbo('string', 'fontcolor'):
          case symbo('string', 'fontsize'):
          case symbo('string', 'italics'):
          case symbo('string', 'link'):
          case symbo('string', 'small'):
          case symbo('string', 'strike'):
          case symbo('string', 'sub'):
          case symbo('string', 'sup'): {
            if (isDotcall) {
              if (
                AST.isStringLiteral(context, true) &&
                args.every(arg => !arg || AST.isPrimitive(arg))
              ) {
                // e.g. ''.fontcolor('red')
                riskyRule('Calling a legacy HTML String.prototype method on a string with primitive args should resolve the call');
                example(`${SYMBOL_DOTCALL}(${calleeName}, "foo", "prop", ...args)`, '"<tag>foo</tag>"');
                before(blockBody[blockIndex]);

                const ctxString = AST.getPrimitiveValue(context);
                const argValues = args.map(arg => arg ? AST.getPrimitiveValue(arg) : undefined);
                // Use the method name to call the correct prototype method
                const method = calleeName.split('_')[1];
                const result = String.prototype[method].call(ctxString, ...argValues);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                else parentNode[parentProp][parentIndex] = AST.primitive(result);

                after(blockBody[blockIndex]);
                ++changes;
                return;
              }
            }
            break;
          }

          default: {
            if (BUILTIN_SYMBOLS.has(calleeName)) {
              todo(`type trackeed tricks can possibly support static ${calleeName}`);
            }
          }
        }

        vlog('  - no changes applied...');

        break;
      }
      case 'MemberExpression': {
        // Try to resolve builtin methods when they are assigned to a binding

        if (
          !node.computed &&
          node.object.type === 'Identifier' &&
          node.object.name !== 'arguments' &&
          (
            (parentNode.type === 'AssignmentExpression' && parentProp === 'right') ||
            (parentNode.type === 'VarStatement' && parentProp === 'init') // The init check is redundant
          )
        ) {
          const meta = fdata.globallyUniqueNamingRegistry.get(node.object.name);
          if (meta.isConstant && meta.typing.mustBeType) {
            // This is assignment with just the member expression as rhs. There's some obfuscation techniques that do this.
            // Note: Member expression calls go above.
            // Note: this is unsafe for non-primitives because they may have own properties that shadow the prototype. So
            //       unless we can prove that the object has no own property of that name, we can't proceed.

            const symb = symbo(meta.typing.mustBeType, node.property.name);
            if (BUILTIN_SYMBOLS.has(symb)) {
              if (PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.mustBeType)) {
                rule('Reading a builtin method property of a builtin type should change to a preval builtin symbol');
                example('const x = parseInt.apply;', `const x = ${symbo('function', 'apply')};`);
                before(blockBody[blockIndex]);

                if (parentNode.type === 'AssignmentExpression') {
                  parentNode.right = AST.identifier(symbo(meta.typing.mustBeType,  node.property.name));
                } else {
                  parentNode.init = AST.identifier(symbo(meta.typing.mustBeType,  node.property.name));
                }

                after(blockBody[blockIndex]);
                ++changes;
              } else {
                todo(`access object property that also exists on prototype? ${symb}`)
              }
            }
          }
        }

        if (!node.computed) {
          let symbol;
          if (AST.isPrimitive(node.object)) {
            symbol = symbo(AST.getPrimitiveType(node.object), node.property.name);
          }
          if (node.object.type === 'Identifier') {
            const meta = fdata.globallyUniqueNamingRegistry.get(node.object.name);
            // The `object` case is unfortunate but too risky here without further checks. I think everything else is fair game.
            if (meta?.typing.mustBeType && meta.typing.mustBeType !== 'object') {
              symbol = symbo(meta.typing.mustBeType, node.property.name);
            }
          }
          if (symbol && BUILTIN_SYMBOLS.has(symbol)) {
            queue.push({
              index: blockIndex,
              func: () => {
                rule('Property reads that read builtin symbols should be replaced by those symbols');
                example('const x = []; x.forEach;', `x; ${symbo('array', 'forEach')};`);
                before(blockBody[blockIndex]);

                if (parentIndex < 0) parentNode[parentProp] = AST.identifier(symbol);
                else parentNode[parentProp][parentIndex] = AST.identifier(symbol);
                // We have to retain the object reference to catch TDZ
                blockBody.splice(blockIndex, 0, AST.expressionStatement(node.object));

                after(blockBody[blockIndex]);
                ++changes;
              }
            });
          }
        }

        break;
      }
    }
  }

  if (changes || queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by moving index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Type tracked tricks applied:', changes, '. Restarting from phase1');
    return { what: 'typeTrackedTricks', changes: changes, next: 'phase1' };
  }

  log('Type tracked tricks applied: 0.');
}

function taint(node, fdata) {
  if (node.type === 'Identifier') {
    const meta = fdata.globallyUniqueNamingRegistry.get(node.name);
    meta.tainted = true;
  }
}

function shouldCoerceIdentToString(meta) {
  // We should coerce the ident to string when it's either
  // - a builtin that is not mustBe a string, or
  // - a const that is not mustBe a string
  return Boolean(
    meta &&
    meta.typing.mustBeType !== 'string' &&
    ((meta.isConstant && meta.writes.length === 1) || meta.isBuiltin)
  );
}

function shouldCoerceIdentToNumber(meta) {
  // We should coerce the ident to string when it's either
  // - a builtin that is not mustBe a string, or
  // - a const that is not mustBe a string
  return Boolean(
    meta &&
    meta.typing.mustBeType !== 'number' &&
    ((meta.isConstant && meta.writes.length === 1) || meta.isBuiltin)
  );
}
