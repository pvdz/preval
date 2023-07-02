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
} from '../utils.mjs';
import {
  ARGUMENTS_ALIAS_BASE_NAME,
  BUILTIN_FUNC_CALL_NAME,
  BUILTIN_REST_HANDLER_NAME,
  BUILTIN_FUNCTION_PROTOTYPE,
  BUILTIN_FUNCTION_METHOD_LOOKUP,
  BUILTIN_REGEXP_METHOD_LOOKUP,
} from '../constants.mjs';
import * as AST from '../ast.mjs';
import {isRegexLiteral, nodeHasNoObservableSideEffectIncStatements} from "../ast.mjs"

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
        break;
      }
      case 'IfStatement':
      case 'WhileStatement': {
        // Other rules should pick up on primitive nodes in if/while tests.
        // But what if we know the type just not the actual value? Often we do know the falsy value.
        // Unfortunately, most of the time that value is discarded. But still. It may not be :)
        if (node.test.type === 'Identifier') {
          const testMeta = fdata.globallyUniqueNamingRegistry.get(node.test.name);
          if (!testMeta.isImplicitGlobal) {
            const truthy = testMeta.typing.mustBeTruthy; // Only true when the binding can only have truthy values. Otherwise we must keep the test as is.
            const falsy =
              !truthy &&
              (testMeta.typing.mustBeFalsy ||
                // One shot for low hanging fruit: verify that the previous statement defined the test to a false primitive (IR state can cause this)
                (testMeta.writes.length &&
                  testMeta.writes[0].kind === 'var' &&
                  AST.isFalsy(testMeta.writes[0].parentNode.init) &&
                  testMeta.writes[0].blockBody[testMeta.writes[0].blockIndex + 1] === node));

            if (falsy) {
              //TODO: test;
              // undefined/null will lead to a literal. boolean must be false. string must be empty. number is unknown but also unhandled at the moment. so I'm not sure this case can be reached right now.
              rule('An `if` test with a truthy value should be replaced with `true`');
              example('if (1) {}', 'if (true) {}');
              before(node.test, node);

              // TODO: fix implicit global errors by compiling the test as a statement
              node.test = AST.fals();

              after(node.test, node);
              ++changes;
            } else if (truthy) {
              // Covered by tests/cases/excl/regex.md tests/cases/ifelse/harder/if_new.md
              rule('An `if` test with a truthy value should be replaced with `false`');
              example('if (0) {}', 'if (false) {}');
              before(node.test, parentNode);

              // TODO: fix implicit global errors by compiling the test as a statement
              node.test = AST.tru();

              after(node.test, node);
              ++changes;
            } else if (node.type !== 'WhileStatement' && (testMeta.isConstant || testMeta.isBuiltin) && testMeta.typing.mustBeType) {
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
                    source(read.blockBody[read.blockIndex]);
                    if (+read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid <= +node.consequent.$p.lastPid) {
                      // Covered by tests/cases/type_tracked/if/base_bool_unknown_false.md
                      rule('When an `if` test is a boolean it must be `true` in the if branch');
                      example('const a = !f(); if (a) g(a); else h(a);', 'const a = !f(); if (a) g(true); else h(false);');
                      before(read.node, node);

                      // This read should be contained somewhere inside the `if`. Possibly even nested in a func.
                      // In any case, the bool value was a constant so it must be `true` in the consequent branch.
                      const finalNode = AST.tru();
                      if (read.parentIndex < 0) read.parentNode[read.parentProp] = finalNode;
                      else read.parentNode[read.parentProp][read.parentIndex] = finalNode;

                      after(finalNode);
                      ++changes;
                    } else if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid) {
                      // Covered by tests/cases/type_tracked/if/base_bool_unknown_false.md
                      rule('When an `if` test is a boolean it must be `false` in the else branch');
                      example('const a = !f(); if (a) g(a); else h(a);', 'const a = !f(); if (a) g(true); else h(false);');
                      before(read.node, node);

                      // This read should be contained somewhere inside the `if`. Possibly even nested in a func.
                      // In any case, the bool value was a constant so it must be `false` in the alternate branch.
                      const finalNode = AST.fals();
                      if (read.parentIndex < 0) read.parentNode[read.parentProp] = finalNode;
                      else read.parentNode[read.parentProp][read.parentIndex] = finalNode;

                      after(finalNode, node);
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

                case 'array':
                case 'object':
                case 'function':
                case 'class':
                case 'regex': {
                  throw ASSERT(false, 'in case case testMeta.typing.mustBeTruthy must be true so this case should not be reachable...?');
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
            } else if (argMeta.typing.mustBeTruthy) {
              // Covered by tests/cases/excl/regex.md
              rule('Inverting a truthy value must yield `false`');
              example('![]', 'false');
              before(node, parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.fals();
              else parentNode[parentProp][parentIndex] = AST.fals();

              after(AST.tru(), parentNode);
              ++changes;
            } else if (argMeta.typing.mustBeType === 'boolean') {
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
              case 'map': {
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
              case 'function': {
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
        let mustBeValue = undefined; // undefined | true | false
        switch (node.operator) {
          case '===':
          case '!==': {
            const lp = left.$p.isPrimitive;
            const rp = right.$p.isPrimitive;
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
                if (lt && rt && lt !== rt) {
                  rule('Strict n/equal comparison between two idents when rhs is known to be undefined or null depends on the lhs');
                  example(
                    'const a = $(undefined); const b = $(undefined); a === b;',
                    'const a = $(undefined); const b = $(undefined); true;',
                  );
                  mustBeValue = false; // Note: we're acting as if op is ===
                } else if (
                  leftMeta.typing.mustBeType &&
                  rightMeta.typing.mustBeType &&
                  leftMeta.typing.mustBeType !== rightMeta.typing.mustBeType
                ) {
                  rule('Strict n/equal comparison between two idents when we know they must be different types can be resolved');
                  example(
                    'const a = $(undefined); const b = $(undefined); a === b;',
                    'const a = $(undefined); const b = $(undefined); true;',
                  );
                  mustBeValue = node.operator === '!=='; // When op is !==, return true because typing mismatch. When ===, return false.
                }
              } else {
                // Since `===` and `!==` are type sensitive, we can predict their outcome even if we
                // don't know their concrete values. If we reached here then it means that either:
                // - we don't have type information about the left or right ident, or
                // - their type matches (in which case we can't predict anything)
              }
            } else if (left.type === 'Identifier' && rp) {
              // Left ident, right a primitive node
              const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
              const lt = leftMeta.typing.mustBeType;
              vlog('Left type:', [lt], ', right value:', [right.$p.primitiveValue], 'operator:', '`' + node.operator + '`');
              // Note that the rhs is a primitive so no need to check explicitly for class.
              // We do explicitly check for `null` just in case, even though that case may never reach here.
              const rt = right.$p.primitiveValue === null ? 'null' : typeof right.$p.primitiveValue;
              if ((leftMeta.isConstant || leftMeta.isBuiltin) && lt && lt !== rt) {
                // Covered: tests/cases/bit_hacks/and_eq_bad.md
                rule('Strict n/equal comparison between an ident and a primitive depends on their type');
                example('const x = 1 * f(2); g(x === "");', 'const x = 1 * f(2); g(false);');
                mustBeValue = false; // Note: we're acting as if op is ===
              } else {
                // The typing for left is not known or does not match the type of the primitive to the right.
              }
            } else if (right.type === 'Identifier' && lp) {
              // Right ident, left a primitive node
              const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);
              const rt = rightMeta.typing.mustBeType;
              // Note that the rhs is a primitive so no need to check explicitly for class.
              // We do explicitly check for `null`
              const lt = left.$p.primitiveValue === null ? 'null' : typeof left.$p.primitiveValue;
              if ((rightMeta.isConstant || rightMeta.isBuiltin) && rt && rt !== lt) {
                // Covered: tests/cases/bit_hacks/and_eq_bad.md
                rule('Strict n/equal comparison between a primitive and an ident depends on their type');
                example('const x = 1 * f(2); g("" === x);', 'const x = 1 * f(2); g(false);');
                mustBeValue = false; // Note: we're acting as if op is ===
              } else {
                // The typing for right is not known or does not match the type of the primitive to the left.
              }
            } else {
              // Either left or right was not an ident and neither was an ident and primitive pair.
              // Normalization can take care of the double primitive case here.
            }

            if (node.operator === '!==') {
              if (mustBeValue === true) {
                mustBeValue = false;
              } else if (mustBeValue === false) {
                mustBeValue = true;
              }
            }

            break;
          }

          case '==':
          case '!=':
            // https://tc39.es/ecma262/#sec-islooselyequal
            // Comparing anything to null or undefined is not observable
            // Comparing object types to each other is not observable
            // In all other cases at least one side is a primitive and the other side is coerced to one if it isn't too
            const lp = left.$p.isPrimitive;
            const rp = right.$p.isPrimitive;

            if (lp && !rp && node.right.type === 'Identifier') {
              const pv = AST.getPrimitiveValue(node.left);
              // We can assert a few cases using the .typing data
              const meta = fdata.globallyUniqueNamingRegistry.get(node.right.name);
              if (meta.isConstant || meta.isBuiltin) {
                if (pv == null && meta.typing.mustBeType) {
                  ASSERT(
                    meta.typing.mustBeType !== 'undefined' && meta.typing.mustBeType !== 'null',
                    'already confirmed not to be a primitive',
                  );
                  // The only two things that weakly compare equal to `null` or `undefined` are `null` and `undefined`.
                  // So as long as that's not the values it can't match.
                  mustBeValue = node.operator !== '==';
                }
              }
            }

            if (!lp && rp && node.left.type === 'Identifier') {
              const pv = AST.getPrimitiveValue(node.right);
              // We can assert a few cases using the .typing data
              const meta = fdata.globallyUniqueNamingRegistry.get(node.left.name);
              if (meta.isConstant || meta.isBuiltin) {
                if (pv == null && meta.typing.mustBeType) {
                  ASSERT(
                    meta.typing.mustBeType !== 'undefined' && meta.typing.mustBeType !== 'null',
                    'already confirmed not to be a primitive',
                  );
                  // The only two things that weakly compare equal to `null` or `undefined` are `null` and `undefined`.
                  // So as long as that's not the values it can't match.
                  mustBeValue = node.operator !== '==';
                }
              }
            }

            if (!lp && !rp) {
              // We know that when both sides are object but of a different kind, that the result is false
              // But we may as well consolidate that logic inside the strict comparison handlers. So we just delegate here.
              rule('When we know each side of a weak comparison must be an object of sorts, use strong comparisons instead');
              example('[] == []', '[] === []', () => node.operator === '==');
              example('[] != []', '[] !== []', () => node.operator === '!=');
              before(node);

              // This is comparing object-types which is the same as using strict comparison so we should change to that
              node.operator = node.operator === '==' ? '===' : '!==';

              after(node);
              ++changes;
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

        if (mustBeValue === true) {
          before(node, grandNode);

          if (parentIndex < 0) parentNode[parentProp] = AST.tru();
          else parentNode[parentProp][parentIndex] = AST.tru();

          after(AST.tru(), grandNode);
          ++changes;
        } else if (mustBeValue === false) {
          before(node, grandNode);

          if (parentIndex < 0) parentNode[parentProp] = AST.fals();
          else parentNode[parentProp][parentIndex] = AST.fals();
          // Covered by tests/cases/bit_hacks/and_eq_bad.md

          after(AST.fals(), grandNode);
          ++changes;
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
            case BUILTIN_FUNC_CALL_NAME: {
              // '$dotCall' -- folding builtins
              // Resolve .call in some cases ($dotCall)

              ASSERT(node.arguments.length >= 2, 'should at least have the function to call and context, and then any number of args');
              ASSERT(
                node.arguments[1].type !== 'Identifier' || node.arguments[1].name !== 'arguments',
                'in normalized code this can never be `arguments` (the only exception to meta fetching)',
              );

              const [
                funcRefNode, // This is the (potentially cached) function value passed on as first arg
                contextNode, // This is the original object that must be the context of this call (until we can determine the context is unused/eliminable)
                ...argNodes // These are the actual args of the original call
              ] = node.arguments;

              if (funcRefNode.type === 'Identifier') {
                // Let's see if we can eliminate some cases here :D
                switch (funcRefNode.name) {
                  case 'Function': {
                    // Context is ignored. Replace with regular call
                    rule('Doing .call on `Function` is moot because it ignores the context');
                    example('Function.call(a, b, c)', 'Function(b, c)');
                    example(BUILTIN_FUNC_CALL_NAME + '(Function, a, b, c)', 'Function(a, b, c)');
                    before(node, grandNode);

                    node.callee = funcRefNode;
                    // Mark all args as tainted, just in case.
                    // We should not need to taint Function and $dotCall metas for this.
                    node.arguments.forEach((enode, i) => {
                      if (i === 1 || i > 2) {
                        if (enode.type === 'Identifier') {
                          taint(enode, fdata);
                        } else if (enode.type === 'SpreadElement') {
                          taint(enode.argument, fdata);
                        }
                      }
                    });
                    node.arguments.splice(0, 2); // Drop `Function`, the context ref, and the prop name

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
                    node.arguments.splice(0, 2); // Drop `Function` and the context ref

                    after(node);
                    ++changes;
                    break;
                  }
                  case 'RegExp': {
                    // Context is ignored. Replace with regular call
                    rule('Doing .call on `RegExp` is moot because it ignores the context');
                    example('RegExp.call(a, b, c)', 'RegExp(b, c)');
                    example(BUILTIN_FUNC_CALL_NAME + '(RegExp, a, b, c)', 'RegExp(a, b, c)');
                    before(node, grandNode);

                    node.callee = funcRefNode;
                    // Mark all args as tainted, just in case.
                    // We should not need to taint Function and $dotCall metas for this.
                    node.arguments.forEach((enode, i) => {
                      if (i === 1 || i > 2) {
                        if (enode.type === 'Identifier') {
                          taint(enode, fdata);
                        } else if (enode.type === 'SpreadElement') {
                          taint(enode.argument, fdata);
                        }
                      }
                    });
                    node.arguments.splice(0, 2); // Drop `RegExp`, the context ref, and the prop name

                    after(node);
                    ++changes;
                    break;
                  }
                  case '$FunctionApply': {
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
                  case '$FunctionCall': {
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
                  case '$RegExpTest': {
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
                }

                // Resolve builtin functions when we somehow know they're being cached
                const refMeta = fdata.globallyUniqueNamingRegistry.get(funcRefNode.name);
                switch (refMeta.typing.builtinTag) {
                  case 'Array#push':
                  case 'Array#pop':
                  case 'Array#shift':
                  case 'Array#unshift': {
                    // Fold the call, make a regular array call. This lets another rule deal with the semantics, which we'll need anyways.
                    // `$dotCall(func, context, arg1, arg2, arg3);`
                    // -> `context.tag(arg1, arg2, arg3);`
                    // The $dotCall asserts for us that the method was called before as well so it should be safe to do
                    // (Additionally, we could verify that the value is an array, but I believe we don't need to?)

                    rule('A $dotCall with builtin methods can be a regular method call');
                    example('$dotCall($ArrayPush, arr, arg1, arg2, arg3);', 'arr.push(arg1, arg2, arg3);');
                    before(node, blockBody[blockIndex]);

                    const methodName = refMeta.typing.builtinTag.slice(refMeta.typing.builtinTag.indexOf('#') + 1);

                    node.callee = AST.memberExpression(node['arguments'][1], methodName);
                    node.arguments.shift(); // Array#<methodName>
                    node.arguments.shift(); // the arr context

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
                            1,
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
          }
        }
        else if (node.callee.type === 'MemberExpression') {
          const isPrim = AST.isPrimitive(node.callee.object);
          const objMetaRegex = !isPrim && node.callee.object.type === 'Identifier' && fdata.globallyUniqueNamingRegistry.get(node.callee.object.name);
          const isRegex = objMetaRegex?.typing?.mustBeType === 'regex' && objMetaRegex.isConstant && AST.isRegexLiteral(objMetaRegex.constValueRef);
          if ((isPrim || isRegex || node.callee.object.type === 'Identifier') && !node.callee.computed) {
            let mustBe = isRegex ? 'regex' : isPrim ? AST.getPrimitiveType(node.callee.object) : fdata.globallyUniqueNamingRegistry.get(node.callee.object.name).typing.mustBeType;

            switch (mustBe + '.' + node.callee.property.name) {
              case 'array.shift': {
                // This is done in another rule
                break;
              }
              case 'boolean.toString': {
                // `true.toString()`
                // `false.toString()`
                // `x.toString()` with x an unknown boolean

                if (isPrim) {
                  const primValue = AST.getPrimitiveValue(node.callee.object)

                  rule('Calling bool.toString() on a primitive should inline the call');
                  example('true.toString()', '"true"');
                  before(node, parentNode);

                  if (parentIndex < 0) parentNode[parentProp] = AST.primitive(primValue.toString());
                  else parentNode[parentProp][parentIndex] = AST.primitive(primValue.toString());

                  if (node.arguments.length > 0) {
                    const rest = node.arguments.slice(0);
                    queue.push({
                      index: blockIndex,
                      func: () => {
                        rest.forEach(arg => {
                          blockBody.splice(blockIndex, 0, AST.expressionStatement(arg));
                        })
                      },
                    });
                  }

                  after(node, parentNode);
                  ++changes;
                }
                break;
              }
              case 'function.apply': {
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
              case 'function.call': {
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
              case 'function.constructor': {
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
              case 'number.toString': {
                // `true.toString()`
                // `false.toString()`
                // `x.toString()` with x an unknown boolean

                if (isPrim && (node.arguments.length === 0 || AST.isPrimitive(node.arguments[0]))) {
                  const primValue = AST.getPrimitiveValue(node.callee.object)

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
                        })
                      },
                    });
                  }

                  after(node, parentNode);
                  ++changes;
                }
                break;
              }
              case 'regex.constructor': {
                // `/foo/.constructor("bar", "g")` silliness, originated from jsf*ck

                rule('Calling regex.constructor() should call the constructor directly');
                example('/foo/.constructor("bar", "g")', 'RegExp("bar", "g")');
                before(node, parentNode);

                node.callee = AST.identifier('RegExp');

                after(node, parentNode);
                ++changes;
                break;
              }
              case 'regex.test': {
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
                        })
                      },
                    });
                  }

                  after(parentNode);
                  ++changes;
                  break;
                }

                break;
              }
              case 'string.concat': {
                if (node.arguments.every(a => AST.isPrimitive(a))) {
                  // 'foo'.slice(0)

                  rule('Calling `concat` on a string with primitive args should resolve the call');
                  example('"hello, world".concat("!")', '"hello, world!"');
                  before(parentNode);

                  const ctxString = AST.getPrimitiveValue(node.callee.object);
                  const args = node.arguments.map(e => AST.getPrimitiveValue(e));

                  const result = ctxString.concat(...args);

                  if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                  else parentNode[parentProp][parentIndex] = AST.primitive(result);

                  after(parentNode);
                  ++changes;
                  break;
                }
                break;
              }
              case 'string.replace': {
                if (
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
                        })
                      },
                    });
                  }

                  after(parentNode);
                  ++changes;
                  break;
                }
                else {
                  const metaArg1 = node.arguments.length > 1 && node.arguments[0].type === 'Identifier' && fdata.globallyUniqueNamingRegistry.get(node.arguments[0].name);

                  if (
                    metaArg1 &&
                    metaArg1.typing.mustBeType === 'regex' && metaArg1.isConstant && AST.isRegexLiteral(metaArg1.constValueRef.node) &&
                    AST.isPrimitive(node.arguments[1]) && AST.getPrimitiveType(node.arguments[1]) === 'string'
                  ) {
                    // 'foo'.replace(/bar/, 'baz')

                    rule('Calling `replace` on a string with regex and string args should resolve the call');
                    example('"foo".replace(/a/g, "a")', '"faa"');
                    before(parentNode);

                    const ctxString = AST.getPrimitiveValue(node.callee.object);
                    const regex = new RegExp(metaArg1.constValueRef.node.regex.pattern, metaArg1.constValueRef.node.regex.flags);
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
                          })
                        },
                      });
                    }

                    if (parentIndex < 0) parentNode[parentProp] = AST.primitive(result);
                    else parentNode[parentProp][parentIndex] = AST.primitive(result);

                    after(parentNode);
                    ++changes;
                    break;

                  }
                }
                break;
              }
              case 'string.slice': {
                const arglen = node.arguments.length;
                if (arglen === 0 || (AST.isPrimitive(node.arguments[0]) && (arglen === 1 || AST.isPrimitive(node.arguments[1])))) {
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
                        })
                      },
                    });
                  }

                  after(parentNode);
                  ++changes;
                  break;
                }
                break;
              }
            }
          }
          else if (node.computed) {
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
          ((parentNode.type === 'AssignmentExpression' && parentProp === 'right') ||
            (parentNode.type === 'VariableDeclarator' && parentProp === 'init')) // The init check is redundant
        ) {
          const meta = fdata.globallyUniqueNamingRegistry.get(node.object.name);
          if (meta.isConstant) {
            if (meta.typing.mustBeType) {
              // Note: member expression calls go above
              switch (meta.typing.mustBeType + '.' + node.property.name) {
                // This is incorrect: function.prototype will return that function's prototype, not to be confused with func.__proto__ which would be Function.prototype
                //case 'function.prototype': {
                //  rule('Reading .prototype from something that must be a function should yield $FunctionPrototype');
                //  example('const x = parseInt.prototype;', 'const x = $FunctionPrototype;');
                //  before(node, blockBody[blockIndex]);
                //  if (parentNode.type === 'AssignmentExpression') {
                //    parentNode.right = AST.identifier(BUILTIN_FUNCTION_PROTOTYPE);
                //  } else {
                //    parentNode.init = AST.identifier(BUILTIN_FUNCTION_PROTOTYPE);
                //  }
                //
                //  after(node, blockBody[blockIndex]);
                //  ++changes;
                //  break;
                //}
                case 'function.apply': {
                  rule('Reading .apply from something that must be a function should yield $FunctionApply');
                  example('const x = parseInt.apply;', 'const x = $FunctionApply;');
                  before(node, blockBody[blockIndex]);
                  if (parentNode.type === 'AssignmentExpression') {
                    parentNode.right = AST.identifier(BUILTIN_FUNCTION_METHOD_LOOKUP.apply);
                  } else {
                    parentNode.init = AST.identifier(BUILTIN_FUNCTION_METHOD_LOOKUP.apply);
                  }

                  after(node, blockBody[blockIndex]);
                  ++changes;
                  break;
                }
                case 'function.call': {
                  rule('Reading .call from something that must be a function should yield $FunctionCall');
                  example('const x = parseInt.call;', 'const x = $FunctionCall;');
                  before(node, blockBody[blockIndex]);

                  if (parentNode.type === 'AssignmentExpression') {
                    parentNode.right = AST.identifier(BUILTIN_FUNCTION_METHOD_LOOKUP.call);
                  } else {
                    parentNode.init = AST.identifier(BUILTIN_FUNCTION_METHOD_LOOKUP.call);
                  }

                  after(node, blockBody[blockIndex]);
                  ++changes;
                  break;
                }
                case 'regex.test': {
                  rule('Reading .test from something that must be a regex should yield $RegExpTest');
                  example('const x = /foo/.test;', 'const x = $RegExpTest;');
                  before(node, blockBody[blockIndex]);

                  if (parentNode.type === 'AssignmentExpression') {
                    parentNode.right = AST.identifier(BUILTIN_REGEXP_METHOD_LOOKUP.test);
                  } else {
                    parentNode.init = AST.identifier(BUILTIN_REGEXP_METHOD_LOOKUP.test);
                  }

                  after(node, blockBody[blockIndex]);
                  ++changes;
                  break;
                }
              }
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
    return 'phase1';
  }

  log('Type tracked tricks applied: 0.');
}

function taint(node, fdata) {
  if (node.type === 'Identifier') {
    const meta = fdata.globallyUniqueNamingRegistry.get(node.name);
    meta.tainted = true;
  }
}
