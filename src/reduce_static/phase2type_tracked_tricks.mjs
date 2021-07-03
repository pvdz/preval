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
import { BUILTIN_FUNC_CALL_NAME, BUILTIN_REST_HANDLER_NAME } from '../constants.mjs';
import * as AST from '../ast.mjs';

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

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
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
      case 'IfStatement': {
        // Other rules should pick up on primitive nodes in if tests.
        // But what if we know the type just not the actual value? Often we do know the falsy value.
        // Unfortunately, most of the time that value is discarded. But still. It may not be :)
        if (node.test.type === 'Identifier') {
          const testMeta = fdata.globallyUniqueNamingRegistry.get(node.test.name);
          if (testMeta.isConstant || testMeta.isBuiltin) {
            if (testMeta.typing.mustBeFalsy) {
              //TODO: test;
              // undefined/null will lead to a literal. boolean must be false. string must be empty. number is unknown but also unhandled at the moment. so I'm not sure this case can be reached right now.
              rule('An `if` test with a truthy value should be replaced with `true`');
              example('if (1) {}', 'if (true) {}');
              before(node.test, node);

              node.test = AST.fals();

              after(node.test, node);
              ++changes;
            } else if (testMeta.typing.mustBeTruthy) {
              // Covered by tests/cases/excl/regex.md tests/cases/ifelse/harder/if_new.md
              rule('An `if` test with a truthy value should be replaced with `false`');
              example('if (0) {}', 'if (false) {}');
              before(node.test, node);

              node.test = AST.tru();

              after(node.test, node);
              ++changes;
            } else if (testMeta.typing.mustBeType) {
              const ttm = testMeta.typing.mustBeType;
              vlog('Found an `if` testing constant `' + node.test.name + '` with mustBeType:', ttm);

              switch (ttm) {
                case 'array':
                case 'object':
                case 'function':
                case 'class':
                case 'regex': {
                  // There is no else branch ... we should be able to wipe it..?
                  // Covered by tests/cases/type_tracked/if/base_arr.md (and base_obj base_func base_regex)
                  rule('If the `if` test is known to be an object-ish type, drop the `else` branch entirely');
                  example('const x = [...x].slice(0); if (x) a(); else b();', 'const x = [...x].slice(0); a();');
                  before(node.test, node);

                  parentNode[parentProp].splice(parentIndex, 1, ...node.consequent.body);

                  after(parentNode);
                  ++changes;
                  break;
                }

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
                      +read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid < +node.consequent.$p.lastPid,
                      ')',
                      ', or alternate?',
                      +node.alternate.$p.pid,
                      '<',
                      +read.node.$p.pid,
                      '<=',
                      +node.alternate.$p.lastPid,
                      '(',
                      +read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid < +node.alternate.$p.lastPid,
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
                    if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid < +node.alternate.$p.lastPid) {
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
                default:
                  ASSERT(false, 'support me', ttm);
              }

              // You could inject an assignment to this variable inside the else branch...
              // It might lead to making a few values no longer `let`, though
              // The better way is probably to walk the branch and replace all occurrences
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

              case '':
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
              );

              if ((leftMeta.isConstant || leftMeta.isBuiltin) && (rightMeta.isConstant || rightMeta.isBuiltin) && lt && rt && lt !== rt) {
                rule('Strict n/equal comparison between two idents when rhs is known to be undefined or null depends on the lhs');
                example(
                  'const a = $(undefined); const b = $(undefined); a === b;',
                  'const a = $(undefined); const b = $(undefined); true;',
                );
                mustBeValue = false; // Note: we're acting as if op is ===
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

                  ASSERT(['init', 'expression', 'left'].includes(parentProp), 'normalized code');
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
                    rule('Doing `+` on a builtin function always returns a string; Array#flat');
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
              // '$dotCall'
              // Resolve .call in some cases ($dotCall)

              ASSERT(node.arguments.length >= 2, 'should at least have the function to call and context, and then any number of args');
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
                }

                // Resolve builtin functions when we somehow know they're being cached
                const refMeta = fdata.globallyUniqueNamingRegistry.get(funcRefNode.name);
                switch (refMeta.typing.builtinTag) {
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
        } else if (node.callee.type === 'MemberExpression') {
          if (node.callee.object.type === 'Identifier' && !node.callee.computed) {
            const objMeta = fdata.globallyUniqueNamingRegistry.get(node.callee.object.name);
            switch (objMeta.typing.mustBeType + '.' + node.callee.property.name) {
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
