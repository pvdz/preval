// By doing some type tracking we can apply some more in depth tricks in phase 2

// fix: /home/ptr/proj/preval/tests/cases/normalize/unary/inv/typeof.md

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

export function typeTrackedTricks(fdata) {
  group('\n\n\nFinding type tracking based tricks\n');
  const r = _typeTrackedTricks(fdata);
  groupEnd();
  return r;
}
function _typeTrackedTricks(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

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
            }
            if (testMeta.typing.mustBeType) {
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

                      const finalNode = AST.literal(ttm === 'number' ? 0 : '');
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
              TODO: test; // Not sure whether it's currently possible to trigger this code path (only non-literal falsy value type is number)
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

                const finalNode = AST.literal('boolean');
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

                const finalNode = AST.literal('number');
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

                const finalNode = AST.literal('string');
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

                const finalNode = AST.literal('object');
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

                const finalNode = AST.literal('function');
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
        vlog('bin expr:', left.type, node.operator, right.type);
        let mustBeValue = undefined; // undefined | true | false
        switch (node.operator) {
          case '===':
          case '!==': {
            const lp = left.$p.isPrimitive;
            const rp = right.$p.isPrimitive;
            // Note: the code runs as if it was `===` and inverts the result afterwards if the op is `!==`
            if (left.type === 'Identifier' && right.type === 'Identifier' && !lp && !rp) {
              // Both are idents and not primitives
              // Covered by tests/cases/type_tracked/eqeqeq/eq_number_string.md
              const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
              const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);

              const lt = leftMeta.typing.mustBeType;
              const rt = rightMeta.typing.mustBeType;
              vlog('yah?', left.name, right.name, [lt, rt], right);

              if (rt && rt && lt !== rt) {
                rule('Strict n/equal comparison between two idents when rhs is known to be undefined or null depends on the lhs');
                example(
                  'const a = $(undefined); const b = $(undefined); a === b;',
                  'const a = $(undefined); const b = $(undefined); true;',
                );
                mustBeValue = false; // Note: we're acting as if op is ===
              } else {
                // Since `===` and `!==` are type sensitive, we can predict their outcome even if we
                // don't know their condcrete values. If we reached here then it means that either:
                // - we don't have type information about the left or right ident, or
                // - their type matches (in which case we can't predict anything)
              }
            } else if (left.type === 'Identifier' && rp) {
              // Left ident, right a primitive node
              const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
              const lt = leftMeta.typing.mustBeType;
              // Note that the rhs is a primitive so no need to check explicitly for class.
              // We do explicitly check for `null` just in case, even though that case may never reach here.
              const rt = right.$p.primitiveValue === null ? 'null' : typeof right.$p.primitiveValue;
              if (lt && lt !== rt) {
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
              if (rt && rt !== lt) {
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
        }

        if (mustBeValue === true) {
          before(node, parentNode);

          if (parentIndex < 0) parentNode[parentProp] = AST.tru();
          else parentNode[parentProp][parentIndex] = AST.tru();

          after(AST.tru(), parentNode);
          ++changes;
        } else if (mustBeValue === false) {
          before(node, parentNode);

          if (parentIndex < 0) parentNode[parentProp] = AST.fals();
          else parentNode[parentProp][parentIndex] = AST.fals();
          // Covered by tests/cases/bit_hacks/and_eq_bad.md

          after(AST.fals(), parentNode);
          ++changes;
        }

        break;
      }
      case 'CallExpression': {
        if (node.callee.type === 'Identifier') {
          switch (node.callee.name) {
            case 'Boolean': {
              const arg = node.arguments[0];
              if (arg?.type === 'Identifier') {
                const meta = fdata.globallyUniqueNamingRegistry.get(arg.name);
                if (meta.typing.mustBeType === 'boolean') {
                  rule('Calling `Boolean()` on a value that we know must be a boolean is a noop');
                  example('const x = a === b; f(Boolean(x));', 'const x = a === b; f(x);');
                  before(node, parentNode);

                  if (parentIndex < 0) parentNode[parentProp] = arg;
                  else parentNode[parentProp][parentIndex] = arg;
                  ++changes;

                  after(arg, parentNode);
                  break;
                }
              }
              break;
            }
            case 'Number': {
              const arg = node.arguments[0];
              if (arg?.type === 'Identifier') {
                const meta = fdata.globallyUniqueNamingRegistry.get(arg.name);
                if (meta.typing.mustBeType === 'number') {
                  rule('Calling `Number()` on a value that we know must be a number is a noop');
                  example('const x = a * b; f(Number(x));', 'const x = a * b; f(x);');
                  before(node, parentNode);

                  if (parentIndex < 0) parentNode[parentProp] = arg;
                  else parentNode[parentProp][parentIndex] = arg;
                  ++changes;

                  after(arg, parentNode);
                  break;
                }
              }
              break;
            }
            case 'String': {
              const arg = node.arguments[0];
              if (arg?.type === 'Identifier') {
                const meta = fdata.globallyUniqueNamingRegistry.get(arg.name);
                if (meta.typing.mustBeType === 'string') {
                  rule('Calling `String()` on a value that we know must be a string is a noop');
                  example('const x = "" + a; f(String(x));', 'const x = "" + a; f(x);');
                  before(node, parentNode);

                  if (parentIndex < 0) parentNode[parentProp] = arg;
                  else parentNode[parentProp][parentIndex] = arg;
                  ++changes;

                  after(arg, parentNode);
                  break;
                }
              }
              break;
            }
            //case 'parseInt': // Note: this coerces to a string first. Not a noop for numbers.
            //case 'parseFloat': // Note: this coerces to a string first. Not a noop for numbers.
          }
        }

        break;
      }
    }
  }

  if (changes) {
    log('Type tracked tricks applied:', changes, '. Restarting from phase1');
    return 'phase1';
  }

  log('Type tracked tricks applied: 0.');
}
