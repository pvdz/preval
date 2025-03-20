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
} from '../utils.mjs';
import {
  ARGUMENTS_ALIAS_BASE_NAME,
  SYMBOL_DOTCALL,
  BUILTIN_REST_HANDLER_NAME,
  SYMBOL_LOOP_UNROLL,
  SYMBOL_MAX_LOOP_UNROLL,
} from '../symbols_preval.mjs';
import { BUILTIN_SYMBOLS, symbo } from '../symbols_builtins.mjs';
import * as AST from '../ast.mjs';
import { getRegexFromLiteralNode } from '../ast.mjs';
import { PRIMITIVE_TYPE_NAMES_PREVAL, PRIMITIVE_TYPE_NAMES_TYPEOF } from '../constants.mjs';
import { BUILTIN_GLOBAL_FUNC_NAMES } from '../globals.mjs';

export function typeTrackedTricks(fdata) {
  group('\n\n\nFinding type tracking based tricks\n');
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
            next.type === 'VariableDeclaration' &&
            next.declarations[0].init.type === 'MemberExpression' &&
            next.declarations[0].init.object.type === 'Identifier' &&
            next.declarations[0].init.computed &&
            AST.isNumberLiteral(next.declarations[0].init.property) &&
            // Now check if previous ident[n] is equal to this ident[n]
            next.declarations[0].init.object.name === targetName &&
            AST.getPrimitiveValue(node.expression.left.property) === AST.getPrimitiveValue(next.declarations[0].init.property)
          ) {
            // This is `ident[n] = simple; const x = ident[n]`. Now verify whether ident is an array
            const arrMeta = fdata.globallyUniqueNamingRegistry.get(targetName);
            if (arrMeta.typing.mustBeType === 'array') {
              // We should be able to replace the arr[n] reference with the simple reference
              rule('Assigning to an array and reading that same array index immediately must yield same value');
              example('arr[0] = x; const y = arr[0]', 'arr[0] = x; const y =x;');
              before(node);
              before(next);

              next.declarations[0].init = AST.cloneSimple(node.expression.right);

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
                testMeta.writes[0].grandNode.kind === 'const' &&
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
                ASSERT(varNode?.type === 'VariableDeclaration', 'var decl yes?', varDeclWrite);
                vlog('Var decl for `' + argMeta.uniqueName + '`:');
                source(varNode);

                if (varNode.declarations[0].init.type !== 'UnaryExpression' || varNode.declarations[0].init.operator !== '!') {
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
                    varNode.declarations[0].init.type === 'UnaryExpression' && varNode.declarations[0].init.operator === '!',
                    'the init should have been a unary bang as well',
                    varNode.declarations[0].init,
                  );
                  const originalArg = varNode.declarations[0].init.argument;

                  // Note: this is normalized code so the arg should be simple at this point
                  // Note: the current node is the bang, not the arg, so we just want to replace in the parent
                  const finalNode = AST.callExpression('Boolean', [AST.cloneSimple(originalArg)]);
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
            const lp = AST.isPrimitive(left);
            const rp = AST.isPrimitive(right);
            const lt = lp ? AST.getPrimitiveType(left) : undefined;
            const rt = rp ? AST.getPrimitiveType(right) : undefined;

            vlog('Primitive types:', [lt, rt]);

            if (lp && rp && lt === rt) {
              rule('Weak comparison when left and right are same primitive type is strict comparison');
              example('+x == +y', '+x === +y');
              before(node);

              node.operator = node.operator === '==' ? '===' : '!==';

              after(node);
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
                before(node);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(node.operator !== '==');
                else parentNode[parentProp][parentIndex] = AST.primitive(node.operator !== '==');

                after(AST.fals(), grandNode);
                ++changes;
                break;
              }
              else if (
                pv == null &&
                ['object', 'array', 'set', 'map', 'regex', 'function', 'promise'].includes(meta.typing.mustBeType)
              ) {
                rule('Comparing a null with an object type always results in false');
                example('null == []', 'false', () => node.operator === '==');
                before(node);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                // (A binary expression must always be an rhs, expression, or init, so no index)
                parentNode[parentProp] = AST.primitive(node.operator !== '==');

                after(node);
                ++changes;
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
                before(node);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(node.operator !== '==');
                else parentNode[parentProp][parentIndex] = AST.primitive(node.operator !== '==');

                after(AST.fals(), grandNode);
                ++changes;
                break;
              }
              else if (
                pv == null &&
                ['object', 'array', 'set', 'map', 'regex', 'function'].includes(meta.typing.mustBeType)
              ) {
                rule('Comparing a null with an object type always results in false');
                example('null == []', 'false', () => node.operator === '==');
                before(node);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                // (A binary expression must always be an rhs, expression, or init, so no index)
                parentNode[parentProp] = AST.primitive(node.operator !== '==');

                after(node);
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
                before(node);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                node.operator = node.operator === '==' ? '===' : '!==';

                after(node);
                ++changes;
                break;
              }
              else if (
                lmeta.typing.mustBeType === rmeta.typing.mustBeType &&
                ['array', 'set', 'map', 'regex', 'function'].includes(lmeta.typing.mustBeType)
              ) {
                // We know that when both sides are object but of a different kind, that the result is false
                // But we may as well consolidate that logic inside the strict comparison handlers. So we just delegate here.
                rule('When we know each side of a weak comparison must be an object of sorts, use strong comparisons instead');
                example('[] == []', '[] === []', () => node.operator === '==');
                example('[] != []', '[] !== []', () => node.operator === '!=');
                before(node);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                node.operator = node.operator === '==' ? '===' : '!==';

                after(AST.fals(), grandNode);
                ++changes;
                break;
              }
              else if (
                lmeta.typing.mustBeType !== rmeta.typing.mustBeType &&
                ['array', 'set', 'map', 'regex', 'function'].includes(lmeta.typing.mustBeType) &&
                ['array', 'set', 'map', 'regex', 'function'].includes(rmeta.typing.mustBeType)
              ) {
                // We know that when both sides are object but of a different kind, that the result is false
                // But we may as well consolidate that logic inside the strict comparison handlers. So we just delegate here.
                rule('When we know each side of a weak comparison must be an object of sorts but not the same type, the result is always false');
                example('[] == {}', 'false');
                before(node);

                // This is comparing object-types which is the same as using strict comparison so we should change to that
                // (A binary expression must always be an rhs, expression, or init, so no index)
                parentNode[parentProp] = AST.primitive(node.operator !== '==');

                after(node);
                ++changes;
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

                if (meta.typing.mustBeType === 'regex') {
                  if (meta.typing.mustBeValue || meta.constValueRef?.node?.raw) {
                    rule('A regex that is used with `+` becomes a string');
                    example('/foo/ + 1', '"/foo/1"');
                    before(node, parentNode);

                    const finalNode = AST.primitive(String(meta.typing.mustBeValue || meta.constValueRef.node.raw));
                    if (pl) node.right = finalNode;
                    else node.left = finalNode;

                    after(node, parentNode);
                    ++changes;
                    return;
                  }
                }

                switch (meta.typing.builtinTag) {
                  case 'Array#filter': {
                    // This is a one-of example which serves to unravel the jsf*ck code (which uses Array#filter)
                    rule('Doing `+` on a builtin function always returns a string; Array#filter');
                    example('f(Array.prototype.filter + "x")', 'f("function flat() { [native code] }x")');
                    before(node, parentNode);

                    const finalNode = AST.primitive('function filter() { [native code] }');
                    if (pl) node.right = finalNode;
                    else node.left = finalNode;

                    after(node, parentNode);
                    ++changes;
                    return;
                  }
                  case 'Array#flat': {
                    // This is a one-of example which serves to unravel the jsf*ck code (which uses Array#flat)
                    rule('Doing `+` on a builtin function always returns a string; Array#flat');
                    example('f(Array.prototype.flat + "x")', 'f("function flat() { [native code] }x")');
                    before(node, parentNode);

                    const finalNode = AST.primitive('function flat() { [native code] }');
                    if (pl) node.right = finalNode;
                    else node.left = finalNode;

                    after(node, parentNode);
                    ++changes;
                    return;
                  }
                  case 'Array#push': {
                    // This is a one-of example which serves to unravel the jsf*ck code (which uses Array#push)
                    rule('Doing `+` on a builtin function always returns a string; Array#push');
                    example('f(Array.prototype.push + "x")', 'f("function push() { [native code] }x")');
                    before(node, parentNode);

                    const finalNode = AST.primitive('function push() { [native code] }');
                    if (pl) node.right = finalNode;
                    else node.left = finalNode;

                    after(node, parentNode);
                    ++changes;
                    return;
                  }
                  case 'Array#pop': {
                    // This is a one-of example which serves to unravel the jsf*ck code (which uses Array#pop)
                    rule('Doing `+` on a builtin function always returns a string; Array#pop');
                    example('f(Array.prototype.pop + "x")', 'f("function pop() { [native code] }x")');
                    before(node, parentNode);

                    const finalNode = AST.primitive('function pop() { [native code] }');
                    if (pl) node.right = finalNode;
                    else node.left = finalNode;

                    after(node, parentNode);
                    ++changes;
                    return;
                  }
                  case 'Array#shift': {
                    // This is a one-of example which serves to unravel the jsf*ck code (which uses Array#shift)
                    rule('Doing `+` on a builtin function always returns a string; Array#shift');
                    example('f(Array.prototype.shift + "x")', 'f("function shift() { [native code] }x")');
                    before(node, parentNode);

                    const finalNode = AST.primitive('function shift() { [native code] }');
                    if (pl) node.right = finalNode;
                    else node.left = finalNode;

                    after(node, parentNode);
                    ++changes;
                    return;
                  }
                  case 'Array#unshift': {
                    // This is a one-of example which serves to unravel the jsf*ck code (which uses Array#unshift)
                    rule('Doing `+` on a builtin function always returns a string; Array#unshift');
                    example('f(Array.prototype.unshift + "x")', 'f("function unshift() { [native code] }x")');
                    before(node, parentNode);

                    const finalNode = AST.primitive('function unshift() { [native code] }');
                    if (pl) node.right = finalNode;
                    else node.left = finalNode;

                    after(node, parentNode);
                    ++changes;
                    return;
                  }
                }
              }
            }

            break;
          }
        }

        break;
      }
      case 'CallExpression': {
        if (node.callee.type === 'Identifier') {
          switch (node.callee.name) {
            case 'eval': {
              // Even more difficult than Function because of direct eval stuffs
              break;
            }
            case 'Function': {
              // TODO: if the arg is a string, we could generate a function from it? Dunno if that's gonna break anything :)
              break;
            }
            case SYMBOL_DOTCALL: {
              // '$dotCall' -- folding builtins
              // Resolve .call in some cases ($dotCall)

              ASSERT(node.arguments.length >= 3, 'should at least have the function to call and context, and then any number of args');
              ASSERT(
                node.arguments[1].type !== 'Identifier' || node.arguments[1].name !== 'arguments',
                'in normalized code this can never be `arguments` (the only exception to meta fetching)',
              );

              const [
                funcRefNode, // This is the (potentially cached) function value passed on as first arg
                contextNode, // This is the original object that must be the context of this call (until we can determine the context is unused/eliminable)
                propNode, // The original property name if it's not computed, undefined if it was computed
                ...argNodes // These are the actual args of the original call
              ] = node.arguments;

              if (funcRefNode.type === 'Identifier') {
                // Let's see if we can eliminate some cases here :D
                switch (funcRefNode.name) {
                  case 'Function': {
                    // Context is ignored. Replace with regular call
                    rule('Doing .call on `Function` is moot because it ignores the context');
                    example('Function.call(a, b, c)', 'Function(b, c)');
                    before(node, grandNode);

                    node.callee = funcRefNode;
                    // Mark all args as tainted, just in case.
                    // We should not need to taint Function and $dotCall metas for this.
                    node.arguments.forEach((enode, i) => {
                      if (i === 1 || i > 3) {
                        if (enode.type === 'Identifier') {
                          taint(enode, fdata);
                        } else if (enode.type === 'SpreadElement') {
                          taint(enode.argument, fdata);
                        }
                      }
                    });

                    // Mark all args as tainted, just in case.
                    // We should not need to taint Function and $dotCall metas for this.
                    node.arguments.forEach((enode, i) => {
                      if (i) {
                        if (enode.type === 'Identifier') {
                          const meta = fdata.globallyUniqueNamingRegistry.get(enode.name);
                          meta.tainted = true;
                        } else if (enode.type === 'SpreadElement' && enode.argument.type === 'Identifier') {
                          const meta = fdata.globallyUniqueNamingRegistry.get(enode.argument.name);
                          meta.tainted = true;
                        }
                      }
                    });

                    node.arguments.splice(0, 3); // Drop `Function`, the context ref, and the prop name

                    after(node);
                    ++changes;
                    break;
                  }
                  case 'RegExp': {
                    // Context is ignored. Replace with regular call
                    rule('Doing .call on `RegExp` is moot because it ignores the context');
                    example('RegExp.call(a, b, c)', 'RegExp(b, c)');
                    example(SYMBOL_DOTCALL + '(RegExp, a, b, c)', 'RegExp(a, b, c)');
                    before(node, grandNode);

                    node.callee = funcRefNode;
                    // Mark all args as tainted, just in case.
                    // We should not need to taint Function and $dotCall metas for this.
                    node.arguments.forEach((enode, i) => {
                      if (i === 1 || i > 3) {
                        if (enode.type === 'Identifier') {
                          taint(enode, fdata);
                        } else if (enode.type === 'SpreadElement') {
                          taint(enode.argument, fdata);
                        }
                      }
                    });
                    node.arguments.splice(0, 3); // Drop `RegExp`, the context ref, and the prop name

                    after(node);
                    ++changes;
                    break;
                  }
                  case symbo('Function', 'apply'): {
                    // If the context is known to be a function, reconstruct it into a regular method call
                    if (contextNode.type === 'Identifier') {
                      const meta = fdata.globallyUniqueNamingRegistry.get(contextNode.name);
                      if (meta.typing.mustBeType === 'function') {
                        // The dotCall always converts dotCall(A, B, C, D, E) to B.apply(C, D, E)
                        rule('Calling function.apply on a function can be a regular method call');
                        example('dotcall($apply, func, A, B, C)', 'func.apply(A, B, C)');
                        before(node, blockBody[blockIndex]);

                        // Reconstruct the method call
                        const finalNode = AST.callExpression(AST.memberExpression(contextNode, 'apply'), argNodes);
                        if (parentIndex < 0) parentNode[parentProp] = finalNode;
                        else parentNode[parentProp][parentIndex] = finalNode;

                        after(finalNode, blockBody[blockIndex]);
                        ++changes;
                        break;
                      }
                    }
                    break;
                  }
                  case symbo('Function', 'call'): {
                    // If the context is known to be a function, reconstruct it into a regular method call
                    if (node.arguments[1].type === 'Identifier') {
                      const meta = fdata.globallyUniqueNamingRegistry.get(node.arguments[1].name);
                      if (meta.typing.mustBeType === 'function') {
                        rule('Calling function.call on a function can be a regular method call');
                        example('Regexp.prototype.test.call(/foo/, x, y, z)', '/foo/.test(x, y, z)');
                        before(node, blockBody[blockIndex]);

                        // Reconstruct the method call
                        const finalNode = AST.callExpression(AST.memberExpression(contextNode, 'apply'), argNodes);
                        if (parentIndex < 0) parentNode[parentProp] = finalNode;
                        else parentNode[parentProp][parentIndex] = finalNode;

                        after(node, blockBody[blockIndex]);
                        ++changes;
                        break;
                      }
                    }
                    break;
                  }
                  case symbo('regex', 'test'): {
                    // If the context is known to be a regex, reconstruct it into a regular method call
                    if (node.arguments[1].type === 'Identifier') {
                      const meta = fdata.globallyUniqueNamingRegistry.get(node.arguments[1].name);
                      if (meta.typing.mustBeType === 'regex') {
                        rule('Calling regexp.test on a regex can be a regular method call');
                        example('Regexp.prototype.test.call(/foo/, x)', '/foo/.test(x)');
                        before(node, blockBody[blockIndex]);

                        // Reconstruct the method call
                        const finalNode = AST.callExpression(AST.memberExpression(contextNode, 'test'), argNodes);
                        if (parentIndex < 0) parentNode[parentProp] = finalNode;
                        else parentNode[parentProp][parentIndex] = finalNode;

                        after(node, blockBody[blockIndex]);
                        ++changes;
                        break;
                      }
                    }
                    break;
                  }
                  default: {
                    if (BUILTIN_SYMBOLS.has(funcRefNode.name)) {
                      todo('Missed opportunity to inline a type tracked trick for', [funcRefNode.name], '?');
                    }
                  }
                }

                // Resolve builtin functions when we somehow know they're being cached
                const refMeta = fdata.globallyUniqueNamingRegistry.get(funcRefNode.name);
                switch (refMeta.typing.builtinTag) {
                  case 'Array#push':
                  case 'Array#pop':
                  case 'Array#shift':
                  case 'Array#unshift': {
                    // Fold the call, make a regular array call. This lets another rule deal with the semantics, which we'll need anyways.
                    // `$dotCall(func, context, "tag", arg1, arg2, arg3);`
                    // -> `context.tag(arg1, arg2, arg3);`
                    // The $dotCall asserts for us that the method was called before as well so it should be safe to do
                    // (Additionally, we could verify that the value is an array, but I believe we don't need to?)

                    rule('A $dotCall with builtin methods can be a regular method call');
                    example(`$dotCall(${symbo('array', 'push')}, arr, "push", arg1, arg2, arg3);`, 'arr.push(arg1, arg2, arg3);');
                    before(node, blockBody[blockIndex]);

                    const methodName = refMeta.typing.builtinTag.slice(refMeta.typing.builtinTag.indexOf('#') + 1);

                    node.callee = AST.memberExpression(node['arguments'][1], methodName);
                    node.arguments.shift(); // Array#<methodName>
                    node.arguments.shift(); // the arr context
                    node.arguments.shift(); // the prop

                    after(node, blockBody[blockIndex]);
                    return true;
                  }
                  case 'Number#toString': {
                    // The radix is a vital arg so we can't resolve this unless we can resolve the arg
                    // This could even support something like `Number.prototype.toString.call("foo")` because why not
                    if ((AST.isPrimitive(contextNode) && !argNodes.length) || AST.isPrimitive(argNodes[0])) {
                      rule('Calling `Number#toString` on a primitive can be resolved if we know the radix');
                      example('123..toString()', '"123"');
                      example('123..toString(15)', '"83"');
                      before(node, blockBody[blockIndex]);

                      const pv = AST.getPrimitiveValue(contextNode);
                      // We don't care about the radix as long as we can resolve the primitive. Defer to JS to resolve the final value.
                      const radix = argNodes[0] ? AST.getPrimitiveValue(argNodes[0]) : 10;
                      const pvn = Number.prototype.toString.call(pv, radix); // pv may not be a string so we do it this way. Let JS sort it out.
                      const finalNode = AST.primitive(pvn);

                      if (parentIndex < 0) parentNode[parentProp] = finalNode;
                      else parentNode[parentProp][parentIndex] = finalNode;

                      // Such an edge case, but make sure additional args (which are ignored) do not trigger tdz errors etc.
                      argNodes.forEach((enode, i) => i && taint(enode.type === 'SpreadElement' ? enode.argument : enode));
                      queue.push({
                        index: blockIndex,
                        func: () =>
                          blockBody.splice(
                            blockIndex,
                            0,
                            // Do not ignore the args. If there are any, make sure to preserve their side effects. If any.
                            // If the method was called with a spread, make sure the spread still happens.
                            ...argNodes
                              .slice(1)
                              .map((anode) => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                          ),
                      });

                      after(node, blockBody[blockIndex]);
                      ++changes;
                      return true;
                    }
                    break;
                  }
                }
              }

              break;
            }
            case BUILTIN_REST_HANDLER_NAME: {
              // Resolve object spread in some cases
              break;
            }
            case symbo('String', 'fromCharCode'): {
              if (node.arguments.every(arg => AST.isPrimitive(arg))) {
                // String.fromCharCode(15, 33, 32)

                rule('Calling `String.fromCharCode` on primitive args should resolve the call');
                example('String.fromCharCode(104,101,108,108,111)', '"hello"');
                before(parentNode);

                if (parentIndex < 0) parentNode[parentProp] = AST.primitive(String.fromCharCode(...node.arguments.map(n => AST.getPrimitiveValue(n))));
                else parentNode[parentProp][parentIndex] = AST.primitive(String.fromCharCode(...node.arguments.map(n => AST.getPrimitiveValue(n))));

                after(parentNode);
                ++changes;
                break;
              }
              break;
            }
            default: {
              if (BUILTIN_SYMBOLS.has(node.callee.name)) {
                todo(`type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: ${node.callee.name}`);
              }
            }
          }
        }
        else if (node.callee.type === 'MemberExpression') {
          // (Parent node is CallExpression)
          const isPrim = AST.isPrimitive(node.callee.object);
          const objMetaRegex = !isPrim && node.callee.object.type === 'Identifier' && fdata.globallyUniqueNamingRegistry.get(node.callee.object.name);
          const isRegex = objMetaRegex?.typing?.mustBeType === 'regex' && objMetaRegex.isConstant && AST.isRegexLiteral(objMetaRegex.constValueRef);
          if ((isPrim || isRegex || node.callee.object.type === 'Identifier') && !node.callee.computed) {
            let mustBe = isRegex ? 'regex' : isPrim ? AST.getPrimitiveType(node.callee.object) : fdata.globallyUniqueNamingRegistry.get(node.callee.object.name).typing.mustBeType;

            const symbol = symbo(mustBe, node.callee.property.name);

            if (PRIMITIVE_TYPE_NAMES_PREVAL.has(mustBe) && BUILTIN_SYMBOLS.has(symbol) && parentNode.type === 'ExpressionStatement') {
              // This call was a statement. It's a method call on a primitive.
              // If it has no discernible args then we can just drop it.
              if (node.arguments.every(anode => AST.isPrimitive(anode))) {
                rule('Statement that is a method call on a primitive with primitive args can be dropped');
                example('2..toString(2);', ';');
                before(parentNode);

                grandNode[grandProp][grandIndex] = AST.emptyStatement();

                after(AST.emptyStatement());
                ++changes;
                break;
              }
            }

            switch (symbol) {
              case symbo('array', 'flatMap'): {
                // This is a whole other level due to the callback.
                if (node.arguments.length === 0) {
                  todo('support $array_flatmap without arguments');
                } else {
                  todo('support $array_flatmap with arguments?');
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
                if (parentNode.type !== 'ExpressionStatement') {
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
                      const newNode = AST.cloneSimple(node.callee.object);
                      if (parentIndex < 0) parentNode[parentProp] = newNode;
                      else parentNode[parentProp][parentIndex] = newNode;
                      // Turn the arr.reverse() call into its own statement now, before where the call happens (although that should not matter much)
                      blockBody.splice(blockIndex, 0, AST.expressionStatement(node));

                      before(blockBody[blockIndex]);
                      before(blockBody[blockIndex+1]);
                    },
                  });
                  changes += 1;
                }

                break;
              }
              case symbo('array', 'shift'): {
                // We can do this provided we can determine the concrete value of all elements of the array
                // See the 'shift' case in arr_mutation
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
                // `true.toString()`
                // `false.toString()`
                // `x.toString()` with x an unknown boolean

                if (isPrim) {
                  const primValue = AST.getPrimitiveValue(node.callee.object);

                  const rest = node.arguments.slice(0);
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rule('Calling bool.toString() on a primitive should inline the call');
                      example('true.toString()', '"true"');
                      before(node, parentNode);

                      if (parentIndex < 0) parentNode[parentProp] = AST.primitive(primValue.toString());
                      else parentNode[parentProp][parentIndex] = AST.primitive(primValue.toString());
                      rest.forEach(arg => {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                      });
                      after(node, parentNode);
                    },
                  });

                  ++changes;
                }
                break;
              }
              case symbo('buffer', 'toString'): {
                // This is a common obfuscator trick to just do `Buffer.from(x, 'base64').toString('ascii')`
                // There are other variations we can support here and I suppose if the conversion is really that simple, we can just resolve it regardless.

                // Start by confirming that the buffer was created with a literal string.
                if (!isPrim && node.callee.object.type === 'Identifier') {
                  const bufMeta = fdata.globallyUniqueNamingRegistry.get(node.callee.object.name);
                  if (bufMeta.isConstant && bufMeta.writes[0]?.kind === 'var' && bufMeta.writes[0].grandNode.kind === 'const') {
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
                      node.arguments.every(anode => AST.isPrimitive(anode))
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
                      const tosArgValues = node.arguments.map(anode => AST.getPrimitiveValue(anode));

                      const result = Buffer.from(...initArgValues).toString(...tosArgValues);
                      // Now eliminate that call expression. We have to go the hard way because it goes one level beyond the grandNode
                      if (blockBody[blockIndex].type === 'VariableDeclaration') {
                        blockBody[blockIndex].declarations[0].init = AST.primitive(result);
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
                      break;
                    }
                  }
                }
                break;
              }
              case symbo('function', 'apply'): {
                const objMeta = fdata.globallyUniqueNamingRegistry.get(node.callee.object.name);
                if (objMeta.isConstant && !objMeta.constValueRef.node.$p.thisAccess) {
                  vlog('Queued transform to eliminate .apply');
                  ++changes;
                  // The transform is a little more subtle since excessive args should also be placed as statements
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rule('When a function does not use `this`, an `.apply` can be a regular call');
                      example('function f(){} f.apply(ctxt, arr);', 'function f(){} ctxt; f(...arr);');
                      before(node, blockBody[blockIndex]);

                      const ctxt = node.arguments[0];
                      const arr = node.arguments[1];
                      const rest = node.arguments.slice(2);

                      const finalNode = AST.callExpression(node.callee.object, arr ? [AST.spreadElement(arr)] : []);
                      if (parentIndex < 0) parentNode[parentProp] = finalNode;
                      else parentNode[parentProp][parentIndex] = finalNode;

                      blockBody.splice(
                        blockIndex,
                        0,
                        AST.expressionStatement(ctxt || AST.identifier('undefined')),
                        ...rest.map((n) => AST.expressionStatement(n)),
                      );

                      after(blockBody.slice(blockIndex, blockIndex + rest.length + 2));
                    },
                  });

                  break;
                }
                break;
              }
              case symbo('function', 'call'): {
                const objMeta = fdata.globallyUniqueNamingRegistry.get(node.callee.object.name);
                if (objMeta.isConstant && !objMeta.constValueRef.node.$p.thisAccess) {
                  vlog('Queued transform to eliminate .call');
                  ++changes;
                  queue.push({
                    index: blockIndex,
                    func: () => {
                      rule('When a function does not use `this`, a `.call` can be a regular call');
                      example('function f(){} f.call(ctxt, A, B, C);', 'function f(){} ctxt; f(A, B, C);');
                      before(node, blockBody[blockIndex]);

                      const ctxt = node.arguments[0];
                      const rest = node.arguments.slice(1);

                      const finalNode = AST.callExpression(node.callee.object, rest);
                      if (parentIndex < 0) parentNode[parentProp] = finalNode;
                      else parentNode[parentProp][parentIndex] = finalNode;

                      if (ctxt) {
                        blockBody.splice(blockIndex, 0, AST.expressionStatement(ctxt || AST.identifier('undefined')));
                      }

                      after(blockBody.slice(blockIndex, blockIndex + rest.length + 2));
                    },
                  });

                  break;
                }
                break;
              }
              case symbo('function', 'constructor'): {
                // `(function(){}).constructor('x')` is equal to calling `Function('x')`
                // Rather than mimicking that logic here, we'll just transform it to `Function` instead and let another rule pick that up

                rule('Calling `.constructor` on a value that must be a function is essentially a call to `Function`');
                example('(function(){}).constructor("x")', 'Function("x")');
                before(node, parentNode);

                node.callee = AST.identifier('Function');

                after(node, parentNode);
                ++changes;
                break;
              }
              case symbo('function', 'toString'): {
                if (BUILTIN_GLOBAL_FUNC_NAMES.has(node.callee.object.name)) {
                  rule('Calling .toString() on a global builtin function can be resolved');
                  example('String.toString();', '"function String() { [native code] }";');
                  before(parentNode);

                  const newNode = AST.primitive(`function ${node.callee.object.name}() { [native code] }`)
                  if (parentIndex < 0) parentNode[parentProp] = newNode;
                  else parentNode[parentProp][parentIndex] = newNode;

                  after(AST.emptyStatement());
                  ++changes;
                  break;
                }
                break;
              }
              case symbo('number', 'toString'): {
                // `true.toString()`
                // `false.toString()`
                // `x.toString()` with x an unknown boolean

                if (isPrim && (node.arguments.length === 0 || AST.isPrimitive(node.arguments[0]))) {
                  const primValue = AST.getPrimitiveValue(node.callee.object);

                  rule('Calling number.toString() on a primitive should inline the call');
                  example('NaN.toString()', '"NaN"');
                  before(node, parentNode);

                  if (parentIndex < 0) parentNode[parentProp] = AST.primitive(primValue.toString(...node.arguments.length === 0 ? [] : [AST.getPrimitiveValue(node.arguments[0])]));
                  else parentNode[parentProp][parentIndex] = AST.primitive(primValue.toString(...node.arguments.length === 0 ? [] : [AST.getPrimitiveValue(node.arguments[0])]));

                  if (node.arguments.length > 1) {
                    const rest = node.arguments.slice(1);
                    queue.push({
                      index: blockIndex,
                      func: () => {
                        rest.forEach(arg => {
                          blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                        });
                      },
                    });
                  }

                  after(node, parentNode);
                  ++changes;
                }
                break;
              }
              case symbo('regex', 'constructor'): {
                // `/foo/.constructor("bar", "g")` silliness, originated from jsf*ck

                rule('Calling regex.constructor() should call the constructor directly');
                example('/foo/.constructor("bar", "g")', 'RegExp("bar", "g")');
                before(node, parentNode);

                node.callee = AST.identifier('RegExp');

                after(node, parentNode);
                ++changes;
                break;
              }
              case symbo('regex', 'test'): {
                const objMeta = fdata.globallyUniqueNamingRegistry.get(node.callee.object.name);
                if (
                  objMeta.isConstant &&
                  objMeta.typing.mustBeType === 'regex' &&
                  (node.arguments.length === 0 || AST.isPrimitive(node['arguments'][0]))
                ) {
                  rule('regex.test when the object is a regex and the arg is known can be resolved');
                  example('/foo/.test("brafoody")', 'true');
                  before(parentNode);

                  const regex = new RegExp(objMeta.constValueRef.node.regex.pattern, objMeta.constValueRef.node.regex.flags);
                  const v = node.arguments.length ? regex.test(AST.getPrimitiveValue(node.arguments[0])) : regex.test();

                  if (parentIndex < 0) parentNode[parentProp] = AST.primitive(v);
                  else parentNode[parentProp][parentIndex] = AST.primitive(v);

                  if (node.arguments.length > 1) {
                    const rest = node.arguments.slice(1);
                    queue.push({
                      index: blockIndex,
                      func: () => {
                        rest.forEach(arg => {
                          blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                        });
                      },
                    });
                  }

                  after(parentNode);
                  ++changes;
                  break;
                }

                break;
              }
              case symbo('string', 'concat'): {
                // Calling .concat() on a known string is equal to `${context}${arg1}${arg2}${etc}`
                // So if we know the number of args, not a splat, then we can transform this to a template

                // Note: context does not need to be a string. we just need to be certain it is a string value.
                if (node.arguments.every(a => a.type !== 'SpreadElement')) {
                  rule('Calling `.concat` on a string literal should change the call expression into a template');
                  example('"add".concat(a, "b", 200)', '`${"add"}${a}${"b"}${200}`');
                  before(parentNode);

                  const newNode = AST.templateLiteral(
                    ['', ''].concat(node.arguments.map(_ => '')), // TWo more string than args; the context is the base case
                    [node.callee.object].concat(node.arguments), // The context and each arg becomes a quasi
                  );

                  if (parentIndex < 0) parentNode[parentProp] = newNode;
                  else parentNode[parentProp][parentIndex] = newNode;

                  after(parentNode);
                  ++changes;
                  break;
                } else {
                  todo('Maybe support type tracked trick of string.concat with spread');
                }
                break;
              }
              case symbo('string', 'charCodeAt'): {
                const arglen = node.arguments.length;
                if (isPrim && (arglen === 0 || AST.isPrimitive(node.arguments[0]))) {
                  // 'foo'.charAt(0)

                  rule('Calling `charCodeAt` on a string with primitive args should resolve the call');
                  example('"hello, world".charAt(7)', '20; $, "w"');
                  before(blockBody[blockIndex]);

                  const ctxString = AST.getPrimitiveValue(node.callee.object);
                  const rest = node.arguments.slice(1);
                  const result = ctxString.charCodeAt(AST.getPrimitiveValue(node.arguments[0]));

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
                  break;
                } else {
                  if (!isPrim) {
                    todo(`Support string.charCodeAt when the object is not a string literal`);
                  } else {
                    todo(`Support string.charCodeAt when the arg is not a string literal`);
                  }
                }
                break;
              }
              case symbo('string', 'indexOf'): {
                const arglen = node.arguments.length;
                if (isPrim && (arglen === 0 || (AST.isPrimitive(node.arguments[0]) && (arglen === 1 || AST.isPrimitive(node.arguments[1]))))) {
                  // 'foo'.indexOf('o', 15)

                  rule('Calling `indexOf` on a string with primitive args should resolve the call');
                  example('"hello, world".indexOf("w", 4, $)', '$, 7');
                  before(parentNode);

                  const ctxString = AST.getPrimitiveValue(node.callee.object);
                  const args = [];
                  if (node.arguments[0]) args.push(AST.getPrimitiveValue(node.arguments[0]));
                  if (node.arguments[1]) args.push(AST.getPrimitiveValue(node.arguments[1])); // I don't think arg 3+ are used?
                  const rest = node.arguments.slice(2);
                  const result = ctxString.indexOf(...args);

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

                  after(parentNode);
                  ++changes;
                  break;
                }
                break;
              }
              case symbo('string', 'lastIndexOf'): {
                const arglen = node.arguments.length;
                if (isPrim && (arglen === 0 || (AST.isPrimitive(node.arguments[0]) && (arglen === 1 || AST.isPrimitive(node.arguments[1]))))) {
                  // 'foo'.lastIndexOf('o', 15)

                  rule('Calling `lastIndexOf` on a string with primitive args should resolve the call');
                  example('"hello, world".lastIndexOf("w", 4, $)', '$, 7');
                  before(parentNode);

                  const ctxString = AST.getPrimitiveValue(node.callee.object);
                  const args = [];
                  if (node.arguments[0]) args.push(AST.getPrimitiveValue(node.arguments[0]));
                  if (node.arguments[1]) args.push(AST.getPrimitiveValue(node.arguments[1])); // I don't think arg 3+ are used?
                  const rest = node.arguments.slice(2);
                  const result = ctxString.lastIndexOf(...args);

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

                  after(parentNode);
                  ++changes;
                  break;
                }
                break;
              }
              case symbo('string', 'replace'): {
                if (
                  isPrim &&
                  node.arguments.length > 1 &&
                  AST.isPrimitive(node.arguments[0]) && AST.getPrimitiveType(node.arguments[0]) === 'string' &&
                  AST.isPrimitive(node.arguments[1]) && AST.getPrimitiveType(node.arguments[1]) === 'string'
                ) {
                  // 'foo'.replace('bar', 'baz')

                  rule('Calling `replace` on a string with string args should resolve the call');
                  example('"foo".replace("o", "a". x, y ,z)', 'x; y; z; "fao"');
                  before(parentNode);

                  const ctxString = AST.getPrimitiveValue(node.callee.object);
                  const rexString = AST.getPrimitiveValue(node.arguments[0]);
                  const rplString = AST.getPrimitiveValue(node.arguments[1]);
                  const rest = node.arguments.slice(2);
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

                  after(parentNode);
                  ++changes;
                  break;
                }

                if (isPrim) {
                  const metaArg1 = node.arguments.length > 1 && node.arguments[0].type === 'Identifier' && fdata.globallyUniqueNamingRegistry.get(node.arguments[0].name);

                  if (
                    metaArg1 &&
                    metaArg1.typing.mustBeType === 'regex' && metaArg1.isConstant && AST.isRegexLiteral(metaArg1.constValueRef.node)
                  ) {
                    if (!node.arguments[1] || AST.isPrimitive(node.arguments[1])) {
                      // - `'foo'.replace(/bar/)`
                      // - `'foo'.replace(/bar/, 'baz')`

                      rule('Calling `replace` on a string with regex and primitive args should resolve the call');
                      example('"foo".replace(/a/g, "a")', '"faa"');
                      before(parentNode);

                      const ctxString = node.arguments[1] ? AST.getPrimitiveValue(node.callee.object) : undefined;
                      const regex = getRegexFromLiteralNode(metaArg1.constValueRef.node);
                      const rplString = AST.getPrimitiveValue(node.arguments[1]);
                      const rest = node.arguments.slice(2);
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

                      after(parentNode);
                      ++changes;
                      break;
                    }

                    ASSERT(node.arguments[1].type === 'Identifier', 'either an arg is a primitive or an ident when normalized', node.arguments[1].type);
                    const metaArg2 = fdata.globallyUniqueNamingRegistry.get(node.arguments[1].name);
                    if (metaArg2.isConstant && metaArg2.constValueRef.node.type === 'FunctionExpression') {
                      // There is a (small) subclass of functions that we can support here
                      const funcNode = metaArg2.constValueRef.node;
                      const funcBody = funcNode.body.body;
                      const bodyOffset = funcNode.$p.bodyOffset;

                      vlog('Verifying whether func arg to string.replace can be simulated, funcOffset=', bodyOffset);

                      // - simple array lookup replacer; `'abc'.replace(/b/, s => { const r = obj[s]; return r; });`
                      // - two statements;
                      //   - var decl that reads property from an object based on first arg. object must be known entirely
                      //   - return statement of that value
                      if (
                        funcBody[bodyOffset].type === 'VariableDeclaration' &&
                        funcBody[bodyOffset].declarations[0].init.type === 'MemberExpression' &&
                        funcBody[bodyOffset].declarations[0].init.object.type === 'Identifier' &&
                        funcBody[bodyOffset].declarations[0].init.computed &&
                        funcBody[bodyOffset].declarations[0].init.property.type === 'Identifier' &&
                        // Confirm that the function starts with assigning param 0
                        funcBody[0].type === 'VariableDeclaration' &&
                        funcBody[0].declarations[0].init.type === 'Param' &&
                        funcBody[0].declarations[0].init.name === '$$0' &&
                        // Is the property being accessed coming from the first param?
                        funcBody[0].declarations[0].id.name === funcBody[bodyOffset].declarations[0].init.property.name &&
                        // And the tail, must only be a return for that ident
                        funcBody[bodyOffset+1]?.type === 'ReturnStatement' &&
                        funcBody[bodyOffset+1].argument.type === 'Identifier' &&
                        funcBody[bodyOffset+1].argument.name === funcBody[bodyOffset].declarations[0].id.name &&
                        !funcBody[bodyOffset+2] // No more
                      ) {
                        // - We've verified this function; function f($$0) { const s = $$0; debugger; const r = obj[s]; return r; }`
                        // We now have to confirm that the `obj` here is fully known and only used
                        // as property access that is not the child of delete or call or assignment-lhs.
                        const objMeta = fdata.globallyUniqueNamingRegistry.get(funcBody[bodyOffset].declarations[0].init.object.name);
                        const objNode = objMeta.isConstant && objMeta.constValueRef.node;
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

                          const str = AST.getPrimitiveValue(node.callee.object);
                          const regex = getRegexFromLiteralNode(metaArg1.constValueRef.node);
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
                          before(blockBody[blockIndex]);

                          if (parentIndex < 0) parentNode[parentProp] = AST.primitive(out);
                          else parentNode[parentProp][parentIndex] = AST.primitive(out);

                          after(blockBody[blockIndex]);
                          ++changes;
                          break;
                        }
                      }

                    }
                  }
                }

                break;
              }
              case symbo('string', 'slice'): {
                const arglen = node.arguments.length;
                if (isPrim && (arglen === 0 || (AST.isPrimitive(node.arguments[0]) && (arglen === 1 || AST.isPrimitive(node.arguments[1]))))) {
                  // 'foo'.slice(0)

                  rule('Calling `slice` on a string with primitive args should resolve the call');
                  example('"hello, world".slice(7, 20, $)', '$, "world"');
                  before(parentNode);

                  const ctxString = AST.getPrimitiveValue(node.callee.object);
                  const args = [];
                  if (node.arguments[0]) args.push(AST.getPrimitiveValue(node.arguments[0]));
                  if (node.arguments[1]) args.push(AST.getPrimitiveValue(node.arguments[1])); // I don't think arg 3+ are used?
                  const rest = node.arguments.slice(2);
                  const result = ctxString.slice(...args);

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

                  after(parentNode);
                  ++changes;
                  break;
                }
                break;
              }
              case symbo('string', 'charAt'): {
                const arglen = node.arguments.length;
                if (isPrim && (arglen === 0 || AST.isPrimitive(node.arguments[0]))) {
                  // 'foo'.charAt(0)

                  rule('Calling `charAt` on a string with primitive args should resolve the call');
                  example('"hello, world".charAt(7, 20, $)', '20; $, "w"');
                  before(blockBody[blockIndex]);

                  const ctxString = AST.getPrimitiveValue(node.callee.object);
                  const args = [];
                  if (node.arguments[0]) args.push(AST.getPrimitiveValue(node.arguments[0]));
                  const rest = node.arguments.slice(1);
                  const result = ctxString.charAt(...args);

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
                  break;
                }
                break;
              }
              case symbo('string', 'split'): {
                const arglen = node.arguments.length;
                if (isPrim && (arglen === 0 || AST.isPrimitive(node.arguments[0]))) {
                  // 'foo'.split()
                  // 'foo'.split('o')

                  rule('Calling `split` on a string with none or a primitive arg should resolve the call');
                  example('"hello, world".split(",", $)', '$, ["hello", " world"]');
                  before(parentNode);

                  const ctxString = AST.getPrimitiveValue(node.callee.object);
                  const args = [];
                  if (arglen > 0) {
                    args.push(AST.getPrimitiveValue(node.arguments[0]));
                  }
                  const rest = node.arguments.slice(1);
                  const result = ctxString.split(...args);

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

                  after(parentNode);
                  ++changes;
                  break;
                }
                else if (arglen > 0 && node.arguments[0].type === 'Identifier') {
                  const metaArg1 = fdata.globallyUniqueNamingRegistry.get(node.arguments[0].name);
                  if (
                    isPrim &&
                    metaArg1 &&
                    metaArg1.typing.mustBeType === 'regex' &&
                    metaArg1.isConstant &&
                    AST.isRegexLiteral(metaArg1.constValueRef.node)
                  ) {
                    // 'foo'.split(/o/)

                    rule('Calling `split` on a string with a regex should resolve the call');
                    example('"hello, world".split(/o/g, $)', '$, ["hell", ", w", "rld"]');
                    before(parentNode);

                    const ctxString = AST.getPrimitiveValue(node.callee.object);
                    const regex = getRegexFromLiteralNode(metaArg1.constValueRef.node);
                    const rest = node.arguments.slice(1);
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

                    after(parentNode);
                    ++changes;
                    break;
                  }
                  else {

                    if (
                      metaArg1 &&
                      metaArg1.typing.mustBeType === 'array' &&
                      metaArg1.isConstant &&
                      metaArg1.writes.length === 1 &&
                      metaArg1.reads.length === 1 && // Technically we can do more than this but this is low hanging fruit
                      metaArg1.constValueRef.node.type === 'ArrayExpression' &&
                      metaArg1.constValueRef.node.elements.length &&
                      metaArg1.constValueRef.node.elements[0] &&
                      (
                        // If it _is_ a string, that's cool
                        AST.isStringLiteral(metaArg1.constValueRef.node.elements[0]) ||
                        ( // If we know the arg mustbea string, that's fine too
                          metaArg1.constValueRef.node.elements[0].type === 'Identifier' &&
                          fdata.globallyUniqueNamingRegistry.get(metaArg1.constValueRef.node.elements[0].name)?.typing?.mustBeType === 'string'
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
                      before(node);
                      before(metaArg1.constValueRef.containerNode);

                      ASSERT(metaArg1.constValueRef.containerNode.type === 'VariableDeclaration', 'not assign or anything because write.len===1, right?', metaArg1.constValueRef);

                      metaArg1.constValueRef.containerNode.declarations[0].init = metaArg1.constValueRef.node.elements[0];

                      after(metaArg1.constValueRef.containerNode);
                      after(node);

                      ++changes;
                      break;
                    }
                  }
                }
                break;
              }
              default: {
                if (BUILTIN_SYMBOLS.has(symbo(mustBe, node.callee.property.name))) {
                  todo(`type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: ${symbo(mustBe, node.callee.property.name)}`);
                }
              }
            }
          }
          else if (node.callee.computed) {
            // Nope.
            break;
          }
          else {
            // Can't predict value of object so can't do anything here

            break;
          }
        }

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
            (parentNode.type === 'VariableDeclarator' && parentProp === 'init') // The init check is redundant
          )
        ) {
          const meta = fdata.globallyUniqueNamingRegistry.get(node.object.name);
          if (meta.isConstant && meta.typing.mustBeType) {
            // This is assignment with just the member expression as rhs. There's some obfuscation techniques that do this.
            // Note: Member expression calls go above.

            if (BUILTIN_SYMBOLS.has(symbo(meta.typing.mustBeType,  node.property.name))) {
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
            }
          }
        }

        break;
      }
    }
  }

  if (changes) {
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
