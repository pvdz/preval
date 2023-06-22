// Look for array literals whose methods get called immediately and try to resolve them if we can guarantee state
// `const arr = [1, 2, 3]; arr.push(4); f(arr.shift()); f(arr)`
// -> `const arr = [2, 3, 4]; f(1); f(arr)`

import walk from '../../lib/walk.mjs';
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
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';
import {
  hasObservableSideEffectsBetween,
  isComplexNode,
  isPrimitive,
  isSimpleNodeOrSimpleMember,
  nodeHasNoObservableSideEffectIncStatements
} from "../ast.mjs"

export function arr_mutation(fdata) {
  group('\n\n\nChecking for array mutations to inline');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _arr_mutation(fdata);
  groupEnd();
  return r;
}
function _arr_mutation(fdata) {
  const queue = [];

  let [updated, addedSequence] = processAttempt(fdata, queue);

  if (queue.length) {
    // By index, high to low. This way it should not be possible to cause reference problems by changing index
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());
  }

  log('');
  if (addedSequence) {
    log('Array accesses changed:', updated, '. At least one change requires a restart to normalize');
    return 'restart';
  }
  if (updated) {
    log('Array accesses changed:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Array accesses changed: 0.');
}

function processAttempt(fdata, queue) {
  // Find arrays where the first read is a method call
  // TODO: Find arrays that call methods before any other potential mutation happens to them (ie. reading index prop is fine, escaping is not)

  let updated = 0;
  let addedSequence = false; // Have to restart if we added a sequence. Otherwise we won't.


  const ast = fdata.tenkoOutput.ast;
  walk(walker, ast, 'ast');
  function walker(arrayLiteralNode, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (arrayLiteralNode.type !== 'ArrayExpression') return;

    // In normalized code the array should be the rhs of an assignment or the init of a var decl

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const grandNode = path.nodes[path.nodes.length - 3];
    const grandProp = path.props[path.props.length - 2];
    const grandIndex = path.indexes[path.indexes.length - 2];
    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

    if (parentNode.type === 'AssignmentExpression' && parentProp === 'right') {
      return; // TODO: we can support a subset of cases on assignments

      if (parentNode.left.type !== 'Identifier') return; // Skip for prop assignment. Not sure if we allow that for array but whatever.

      // Determine whether
      // - next access is a read (it's irrelevant whether the binding is const or not; its contents is mutable and we must assert its contents too)
      //   - find the "write"
      //   - find the next read
      // - the read is a known method call
      // - there are no observable side effects
      // - it's the same scope, loopLevel, catchLevel, and finallyLevel

      console.log(parentNode);
      TODO
    }

    if (!(parentNode.type === 'VariableDeclarator' && parentProp === 'init')) {
      vlog('- bail: can only handle array literals that are init to a const decl');
      return;
    }

    const lhsName = parentNode.id.name;
    const lhsMeta = fdata.globallyUniqueNamingRegistry.get(lhsName);
    let orderIndex = lhsMeta.rwOrder.findIndex(n => n.node === parentNode.id);
    const write = lhsMeta.rwOrder[orderIndex];
    ASSERT(write.action === 'write', 'the var decl was a write, this check should be kind of silly');

    // Keep searching until you find a rw that is in the same func. Must appear after the binding.
    // Then verify if that's a read in same loop/catch/finally that can reach this without side effects
    let nextRead = lhsMeta.rwOrder[orderIndex + 1];
    while (nextRead && nextRead.pfuncNode !== write.pfuncNode) {
      //console.log('- read/write not in same function scope, trying next rw', nextRead.pfuncNode.$p.pid, write.pfuncNode.$p.pid)
      ++orderIndex;
      nextRead = lhsMeta.rwOrder[orderIndex + 1];
    }
    if (!nextRead) return vlog('bail: there is no next read in same scope');
    if (nextRead?.action !== 'read') return vlog('bail: next ref in same scope is a write'); // Okay, next reference to this binding is not a read so we don't care

    // Confirm that both nodes are in the same loop, catch, and finally "scope" because
    // otherwise we can't guarantee that the read even happens sequentially

    if (nextRead.innerLoop !== write.innerLoop) return vlog('- read/write not in same loop scope', nextRead.innerLoop, write.innerLoop);
    if (nextRead.innerCatch !== write.innerCatch) return vlog('- read/write not in same catch scope', nextRead.innerCatch, write.innerCatch);
    if (nextRead.innerFinally !== write.innerFinally) return vlog('- read/write not in same finally scope', nextRead.innerFinally, write.innerFinally);

    vlog('Have an array decl init', arrayLiteralNode.$p.pid, 'and a read of that binding:', lhsName);

    // Now confirm there are no observable side effects between read and write

    vlog('Walking sub-node for scan:');
    source(blockBody);

    if (hasObservableSideEffectsBetween(ast, grandNode, nextRead.blockBody[nextRead.blockIndex])) {
      vlog('- bail: found at least one observable statement between read and write');
      return;
    }

    vlog('Determine how the array is being read and try to inline it');

    switch (nextRead.parentNode.type) {
      case 'MemberExpression': {
        if (nextRead.parentNode.object === nextRead.node) {
          vlog('Property read on the array:', nextRead.parentNode.property.name);
          vlog(nextRead.parentNode);
          if (nextRead.parentNode.computed) {
            // `arr[foo]`
            vlog('Computed property read on the array. We can inline certain literals');
            //TODO
          } else {
            // `arr.foo`
            ASSERT(nextRead.parentNode.property.type === 'Identifier', 'non-computed must have ident, yes?');
            switch (nextRead.parentNode.property.name) {
              case 'length': {
                // I think this is unsafe? What if code gets moved. TODO
                vlog('- bail: not sure if array.length is safe to inline');
                return;
              }
              case 'pop': {
                if (nextRead.grandNode.type === 'CallExpression') {
                  // These are a bit annoying because we need to reach to the grand-grand parent
                  // node to replace the call and we don't store that by default.
                  // Instead, for now, we'll check some cases on the statement level.

                  const arrNode = write.parentNode.init;
                  if (arrNode.elements.length === 0) {
                    rule('Calling .pop on an empty array literal resolves to undefined');
                    example('const arr = []; arr.pop();', 'const arr = [1, 2, 3]; undefined;');
                    before(write.blockBody[write.blockIndex]);
                    before(nextRead.blockBody[nextRead.blockIndex]);

                    const newNode = nextRead.grandNode.arguments.length ? AST.sequenceExpression(nextRead.grandNode.arguments.concat([AST.identifier('undefined')])) : AST.identifier('undefined');
                    if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
                      if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                        // Call was a statement
                        nextRead.blockBody[nextRead.blockIndex].expression = newNode;
                      } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssigmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
                        // Call was assigned
                        nextRead.blockBody[nextRead.blockIndex].expression.right = newNode;
                      } else {
                        // what normalized cases are left?
                        TODO
                      }
                    } else if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
                      // Call was init of a binding decl
                      ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');
                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init = newNode;
                    } else {
                      TODO
                    }

                    after(write.blockBody[write.blockIndex]);
                    after(nextRead.blockBody[nextRead.blockIndex]);
                    updated = true;
                    if (nextRead.grandNode.arguments.length) addedSequence = true; // Eliminated useless .pop() args
                    return;
                  } else {
                    rule('Calling .pop on an array literal we can fully track can be resolved');
                    example('const arr = [1, 2, 3]; arr.pop();', 'const arr = [1, 2]; 3;');
                    before(write.blockBody[write.blockIndex]);
                    before(nextRead.blockBody[nextRead.blockIndex]);

                    const firstArrNode = arrNode.elements.pop();

                    const newNode = nextRead.grandNode.arguments.length ? AST.sequenceExpression(nextRead.grandNode.arguments.concat([firstArrNode])) : firstArrNode;
                    if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
                      if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                        // Call was a statement
                        nextRead.blockBody[nextRead.blockIndex].expression = newNode;
                      } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssigmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
                        // Call was assigned
                        nextRead.blockBody[nextRead.blockIndex].expression.right = newNode;
                      } else {
                        // what normalized cases are left?
                        TODO
                      }
                    } else if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
                      // Call was init of a binding decl
                      vlog(nextRead.blockBody[nextRead.blockIndex].declarations[0].init )
                      ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');
                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init = newNode;
                    } else {
                      TODO
                    }

                    after(write.blockBody[write.blockIndex]);
                    after(nextRead.blockBody[nextRead.blockIndex]);
                    updated = true;
                    if (nextRead.grandNode.arguments.length) addedSequence = true; // Eliminated useless .pop() args
                    return;
                  }
                } else {
                  vlog('- bail: Read .pop but did not call it');
                  // TODO: replace it with $Array_pop
                  return;
                }
              }
              case 'shift': {
                if (nextRead.grandNode.type === 'CallExpression') {
                  // These are a bit annoying because we need to reach to the grand-grand parent
                  // node to replace the call and we don't store that by default.
                  // Instead, for now, we'll check some cases on the statement level.

                  const arrNode = write.parentNode.init;
                  if (arrNode.elements.length === 0) {
                    rule('Calling .shift on an empty array literal resolves to undefined');
                    example('const arr = []; arr.shift();', 'const arr = []; undefined;');
                    before(write.blockBody[write.blockIndex]);
                    before(nextRead.blockBody[nextRead.blockIndex]);

                    const newNode = nextRead.grandNode.arguments.length ? AST.sequenceExpression(nextRead.grandNode.arguments.concat([AST.identifier('undefined')])) : AST.identifier('undefined');
                    if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
                      if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                        // Call was a statement
                        nextRead.blockBody[nextRead.blockIndex].expression = newNode;
                      } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssigmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
                        // Call was assigned
                        nextRead.blockBody[nextRead.blockIndex].expression.right = newNode;
                      } else {
                        // what normalized cases are left?
                        TODO
                      }
                    } else if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
                      // Call was init of a binding decl
                      ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');
                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init = newNode;
                    } else {
                      TODO
                    }

                    after(write.blockBody[write.blockIndex]);
                    after(nextRead.blockBody[nextRead.blockIndex]);
                    updated = true;
                    if (nextRead.grandNode.arguments.length) addedSequence = true; // Eliminated useless .shift() args
                    return;
                  } else {
                    rule('Calling .shift on an array literal we can fully track can be resolved');
                    example('const arr = [1, 2, 3]; f(arr.shift()); f(arr);', 'const arr = [2, 3]; f(1); f(arr);');
                    before(write.blockBody[write.blockIndex]);
                    before(nextRead.blockBody[nextRead.blockIndex]);

                    const firstArrNode = arrNode.elements.shift();

                    const newNode = nextRead.grandNode.arguments.length ? AST.sequenceExpression(nextRead.grandNode.arguments.concat([firstArrNode])) : firstArrNode;
                    if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
                      if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                        // Call was a statement
                        nextRead.blockBody[nextRead.blockIndex].expression = newNode;
                      } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssigmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
                        // Call was assigned
                        nextRead.blockBody[nextRead.blockIndex].expression.right = newNode;
                      } else {
                        // what normalized cases are left?
                        TODO
                      }
                    } else if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
                      // Call was init of a binding decl
                      ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');
                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init = newNode;
                    } else {
                      TODO
                    }

                    after(write.blockBody[write.blockIndex]);
                    after(nextRead.blockBody[nextRead.blockIndex]);
                    updated = true;
                    if (nextRead.grandNode.arguments.length) addedSequence = true; // Eliminated useless .shift() args
                    return;
                  }
                } else {
                  vlog('- bail: Read .shift but did not call it');
                  // TODO: replace it with $Array_shift
                  return;
                }
              }
              case 'push': {
                if (nextRead.grandNode.type === 'CallExpression') {
                  // These are a bit annoying because we need to reach to the grand-grand parent
                  // node to replace the call and we don't store that by default.
                  // Instead, for now, we'll check some cases on the statement level.

                  // Keep in mind array.push returns the length of the array afterwards, which is
                  // always (?) arr.length + the number of arguments. So we should always replace the
                  // actual call with a sequence ending with that number. Other parts will eliminate it.

                  let argList = nextRead.grandNode.arguments;

                  while (argList.length && isPrimitive(argList[0])) {
                    // Remove the first param from the call and append it to the array literal

                    rule('Push on an array literal with first element simple should move the node');
                    example('const arr = [1, 2]; arr.push("a", "b");', 'const arr = [1, 2, "a"]; f(arr.push("b"));');
                    before(arrayLiteralNode);
                    before(nextRead.grandNode);

                    arrayLiteralNode.elements.push(argList.shift());

                    after(arrayLiteralNode);
                    after(nextRead.grandNode);
                    ++updated;
                  }

                  if (nextRead.grandNode.arguments.length === 0) {
                    // noop, eliminate call and replace wiht

                    rule('Array push without arguments can be replaced with the (final) arg count');
                    example('const arr = [1, 2, 3]; count = arr.push();', 'const arr = [1, 2, 3]; count = 3;');
                    before(arrayLiteralNode);
                    before(nextRead.blockBody[nextRead.blockIndex]);

                    if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
                      if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                        // Call was a statement. Just drop it.
                        nextRead.blockBody[nextRead.blockIndex].expression = AST.emptyStatement();
                      } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssigmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
                        // Call was assigned
                        nextRead.blockBody[nextRead.blockIndex].expression.right = AST.literal(arrayLiteralNode.elements.length);
                      } else {
                        // what normalized cases are left?
                        TODO
                      }
                    } else if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
                      // Call was init of a binding decl
                      ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');
                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init = AST.literal(arrayLiteralNode.elements.length);
                    } else {
                      TODO
                    }

                    after(arrayLiteralNode);
                    after(nextRead.blockBody[nextRead.blockIndex]);
                    ++updated;
                  } else {
                    // There are args left so the push cannot be eliminated

                    if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
                      if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                        // Call was a statement. Noop

                      } else if (
                        nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssigmentExpression' &&
                        nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode
                      ) {
                        // Call was assigned
                        rule('Array push with arguments can be replaced with the (final) arg count');
                        example('const arr = [1, 2, 3]; count = arr.push(5, $);', 'const arr = [1, 2, 3, 5]; count = (arr.push($), 5);');
                        before(arrayLiteralNode);
                        before(nextRead.blockBody[nextRead.blockIndex]);

                        nextRead.blockBody[nextRead.blockIndex].expression.right = AST.sequenceExpression([
                          nextRead.blockBody[nextRead.blockIndex].expression.right,
                          AST.literal(arrayLiteralNode.elements.length + argList.length),
                        ]);

                        after(arrayLiteralNode);
                        after(nextRead.blockBody[nextRead.blockIndex]);
                        ++updated;
                        addedSequence = true;
                        return;
                      } else {
                        // already transformed sequence? ignore
                      }
                    } else if (
                      nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration' &&
                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode
                    ) {
                      // Call was init of a binding decl
                      ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');

                      rule('Array push with arguments can be replaced with the (initial) arg count');
                      example('const arr = [1, 2, 3]; const count = arr.push(5, $);', 'const arr = [1, 2, 3, 5]; const count = (arr.push($), 5);');
                      before(arrayLiteralNode);
                      before(nextRead.blockBody[nextRead.blockIndex]);

                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init = AST.sequenceExpression([
                        nextRead.blockBody[nextRead.blockIndex].declarations[0].init,
                        AST.literal(arrayLiteralNode.elements.length + argList.length),
                      ]);

                      after(arrayLiteralNode);
                      after(nextRead.blockBody[nextRead.blockIndex]);
                      ++updated;
                      addedSequence = true;
                      return;
                    } else {
                      TODO
                    }
                  }
                } else {
                  vlog('- bail: Read .push but did not call it');
                  // TODO: replace it with $Array_push
                  return;
                }

                break;
              }
              case 'unshift': {
                if (nextRead.grandNode.type === 'CallExpression') {
                  // These are a bit annoying because we need to reach to the grand-grand parent
                  // node to replace the call and we don't store that by default.
                  // Instead, for now, we'll check some cases on the statement level.

                  // Keep in mind array.unshift returns the length of the array afterwards, which is
                  // always (?) arr.length + the number of arguments. So we should always replace the
                  // actual call with a sequence ending with that number. Other parts will eliminate it.

                  let argList = nextRead.grandNode.arguments;

                  while (argList.length && isPrimitive(argList[argList.length - 1])) {
                    // Remove the first param from the call and append it to the array literal

                    rule('Unshift on an array literal with first element simple should move the node');
                    example('const arr = [100]; arr.unshift(1, 2));', 'const arr = [3, 100]; arr.unshift(1, 2)');
                    before(arrayLiteralNode);
                    before(nextRead.grandNode);

                    arrayLiteralNode.elements.unshift(argList.pop());

                    after(arrayLiteralNode);
                    after(nextRead.grandNode);
                    ++updated;
                  }

                  if (nextRead.grandNode.arguments.length === 0) {
                    // noop, eliminate call and replace wiht

                    rule('Array unshift without arguments can be replaced with the (final) arg count');
                    example('const arr = [1, 2, 3]; const count = arr.unshift();', 'const arr = [1, 2, 3]; const count = 3;');
                    before(arrayLiteralNode);
                    before(nextRead.blockBody[nextRead.blockIndex]);

                    if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
                      if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                        // Call was a statement. Just drop it.
                        nextRead.blockBody[nextRead.blockIndex].expression = AST.emptyStatement();
                      } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssigmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
                        // Call was assigned
                        nextRead.blockBody[nextRead.blockIndex].expression.right = AST.literal(arrayLiteralNode.elements.length);
                      } else {
                        // what normalized cases are left?
                        TODO
                      }
                    } else if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
                      // Call was init of a binding decl
                      ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');
                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init = AST.literal(arrayLiteralNode.elements.length);
                    } else {
                      TODO
                    }

                    after(arrayLiteralNode);
                    after(nextRead.blockBody[nextRead.blockIndex]);
                    ++updated;
                  } else {
                    // There are args left so the unshift cannot be eliminated

                    if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
                      if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                        // Call was a statement. Noop

                      } else if (
                        nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssigmentExpression' &&
                        nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode
                      ) {
                        // Call was assigned
                        rule('Array unshift with arguments can be replaced with the (final) arg count');
                        example('const arr = [1, 2, 3]; count = arr.unshift($, 5);', 'const arr = [5, 1, 2, 3]; count = (arr.unshift($), 5);');
                        before(arrayLiteralNode);
                        before(nextRead.blockBody[nextRead.blockIndex]);

                        nextRead.blockBody[nextRead.blockIndex].expression.right = AST.sequenceExpression([
                          nextRead.blockBody[nextRead.blockIndex].expression.right,
                          AST.literal(arrayLiteralNode.elements.length + argList.length),
                        ]);

                        after(arrayLiteralNode);
                        after(nextRead.blockBody[nextRead.blockIndex]);
                        ++updated;
                        addedSequence = true;
                      } else {
                        // already transformed sequence? ignore
                      }
                    } else if (
                      nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration' &&
                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode
                    ) {
                      // Call was init of a binding decl
                      ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');

                      rule('Array unshift with arguments can be replaced with the (final) arg count');
                      example('const arr = [1, 2, 3]; const count = arr.unshift($, 5);', 'const arr = [5, 1, 2, 3]; const count = (arr.unshift($), 5);');
                      before(arrayLiteralNode);
                      before(nextRead.blockBody[nextRead.blockIndex]);

                      nextRead.blockBody[nextRead.blockIndex].declarations[0].init = AST.sequenceExpression([
                        nextRead.blockBody[nextRead.blockIndex].declarations[0].init,
                        AST.literal(arrayLiteralNode.elements.length + argList.length),
                      ]);

                      after(arrayLiteralNode);
                      after(nextRead.blockBody[nextRead.blockIndex]);
                      ++updated;
                      addedSequence = true;
                    } else {
                      TODO
                    }
                  }
                } else {
                  vlog('- bail: Read .unshift but did not call it');
                  // TODO: replace it with $Array_unshift
                  return;
                }
              }
            }
          }

        }
        else if (nextRead.parentNode.property === nextRead.node) {
          // This is `arr[ [1,2,3] ]` (or `const a = [1,2,3]; arr[a];`)
          // Ignore.
          return;
        } else {
          // ??
          console.log(nextRead)
          TODO
        }
      }
    }
  }

  return [updated, addedSequence];
}
