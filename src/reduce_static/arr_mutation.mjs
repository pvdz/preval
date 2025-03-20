// Look for array literals whose methods get called immediately and try to resolve them if we can guarantee state
// `const arr = [1, 2, 3]; arr.push(4); f(arr.shift()); f(arr)`
// -> `const arr = [2, 3, 4]; f(1); f(arr)`

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, coerce, findBodyOffset, todo, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';
import {
  hasObservableSideEffectsBetweenRefs,
  isComplexNode,
  isPrimitive,
  isSimpleNodeOrSimpleMember,
  nodeHasNoObservableSideEffectIncStatements
} from "../ast.mjs"
import { symbo } from '../symbols_builtins.mjs';

export function arr_mutation(fdata) {
  group('\n\n\nChecking for array mutations to inline');
  vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _arr_mutation(fdata);
  groupEnd();
  return r;
}
function _arr_mutation(fdata) {
  const queue = [];

  let updated = 0;
  let addedSequence = false;

  processAttempt(fdata);

  if (queue.length) {
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());
  }

  log('');
  if (addedSequence) {
    log('Array accesses changed:', updated, '. At least one change requires a restart to normalize');
    return {what: 'arr_mutation', changes: updated, next: 'normal'};
  }
  if (updated) {
    log('Array accesses changed:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'arr_mutation', changes: updated, next: 'phase1'};
  }
  log('Array accesses changed: 0.');
  return;

  function processAttempt(fdata) {
    // Find arrays where the first read is a method call
    // TODO: Find arrays that call methods before any other potential mutation happens to them (ie. reading index prop is fine, escaping is not)

    fdata.globallyUniqueNamingRegistry.forEach(arrMeta => {
      if (arrMeta.isBuiltin) return;
      if (arrMeta.isImplicitGlobal) return;

      arrMeta.writes.forEach(write => {
        if (
          write.kind === 'var' &&
          write.parentNode.init.type === 'ArrayExpression'
        ) {
          vgroup('- Array assignment @', +write.parentNode.init.$p.pid);
          processArray(arrMeta, write, write.parentNode.init);
          vgroupEnd();
        }
        else if (
          write.kind === 'assign' &&
          write.parentNode.right.type === 'ArrayExpression'
        ) {
          vgroup('- Array assignment @', +write.parentNode.right.$p.pid);
          processArray(arrMeta, write, write.parentNode.right);
          vgroupEnd();
        }
      })

    });
  }

  function processArray(arrMeta, write, arrNode) {
    const rwIndex = arrMeta.rwOrder.indexOf(write);
    ASSERT(rwIndex >= 0);

    const read = arrMeta.rwOrder[rwIndex + 1];
    if (!read) return vlog('- bail: array is not followed by read');

    if (read.parentNode.type !== 'MemberExpression') {
      // This may be `const arr = []; const f = function(){ $(arr); }; arr[0] = 1` sort of thing.
      // In that case we are able to safely assert that the array is invariably still empty when arr[0]=1 happens.
      // This is pretty slow path but may be worthwhile
      if (!arrMeta.singleScoped) {
        vlog('- Parent is not member expression but it is not single scoped so checking an alt-path; reads that can reach this write:', write.reachedByReads.size);
        // Find the first read that can reach this write and that's in the same (func) scope.
        // We then have to confirm that there are no observable side effects between the refs.

        const read = Array.from(write.reachedByReads).find(read => {
          if (write.funcChain === read.funcChain) {
            return true;
          }
        });
        if (read) {
          vlog('- Have a read; @', +read.node.$p.pid, ', now scanning for spies between write and read...');
          if (read.parentNode.type !== 'MemberExpression') {
            return vlog('- bail: the alt-path read was also not part of a member expression');
          }
          if (read.parentProp !== 'object') {
            return vlog('- bail: the alt-path read parent prop was not object');
          }
          // This read should be the first read in source code order in the same (func) scope as the write.
          // Now we must confirm that there could not have been anything that mutated between them.
          // (If no spy could have been called then no closure could have been activated and we assert
          // that the array shape at read time must be the same as how it was written at write time.)
          vgroup();
          let has = hasObservableSideEffectsBetweenRefs(write, read);
          vgroupEnd();
          vlog('- Detected spies between write and read?', has);
          if (has) {
            return vlog('- bail: parent was not member and there might be a spy between the write and the first next read in same scope');
          }
          vlog('- It seems the next read in same scope as write will see the array as written, we can still continue!');
          processArrayWriteRead(arrMeta, arrNode, write, read, rwIndex, true);
          return;
        }
        return vlog('- bail: parent is not member expression and binding is single scoped; the array escapes');
      }
      return vlog('- bail: Parent is not member expression');
    }
    if (read.parentProp !== 'object') return vlog('- bail: Array is not the member object');

    processArrayWriteRead(arrMeta, arrNode, write, read, rwIndex, false);
  }

  function processArrayWriteRead(arrMeta, arrNode, write, read, writeRwIndex, checkedForSpiesBetween) {
    // Note: The write and read should be adjacent in source code order. The write
    //       is a var or assign of an array literal. There's no other guarantee.

    // Confirm the read and write appear in the same if/loop/try context
    // TODO: I think we can relax these constraints a bit
    if (write.innerIf !== read.innerIf) return vlog('- bail: No in same if-branch', write.innerIf, read.innerIf);
    if (write.innerElse !== read.innerElse) return vlog('- bail: Not in same else-branch', write.innerElse, read.innerElse);
    if (write.innerLoop !== read.innerLoop) return vlog('- bail: Not in same loop', write.innerLoop, read.innerLoop);
    if (write.innerTry !== read.innerTry) return vlog('- bail: Not in same try', write.innerTry, read.innerTry);

    // Must confirm that the next read will see this array as it is
    // That means:
    // - There is only one write, or
    // - This is a single scoped var (the write+read are source code order so there's nothing in between), or
    // - This is a multi scoped var and we walked the path between this write and the next read and the binding can not mutate between them
    // In addition the write and read must be in the same `if` branch, loop scope, and `try`-block.

    // We then have to confirm that the array state remains the same, which means:
    // - The var is single scoped (since we only look at the first read after the write, no mutation is possible), or
    // - Every read of the array was to read a numbered computed property (or .length) and the result is not called, or
    // - Same but confirmed not to happen between the write and the read
    //   - For example, defining a new variable with function expression as init can not possibly mutate the array
    // - There may be exceptions to things known to be safe, like calling .slice() for example
    // When doing the expensive part we have to be careful around loops and trys.

    if (arrMeta.writes.length === 1) {
      // Ok. The array can not mutate after initialization.
    }
    else if (arrMeta.singleScoped) {
      // Ok. The read is source code order following the write and if they are
      // same if/loop/try then there's no way for the binding to mutate between them.
    } else {
      // Harder. We must assert that the binding does not mutate between the write
      // and the read. We can only apply heuristics here by skipping statements where
      // we know there is no side effect (spy) that might mutate the array binding.

      let has = hasObservableSideEffectsBetweenRefs(write, read);
      if (has) return vlog('  - bail: found at least one observable statement between read and write');
    }

    // We should now have a write+read, the read can assume the binding still has the array literal from the write.
    processArrayWriteReadImmutableBinding(arrMeta, arrNode, write, read, writeRwIndex, checkedForSpiesBetween);
  }

  function processArrayWriteReadImmutableBinding(arrMeta, arrNode, write, read, writeRwIndex, checkedForSpiesBetween) {
    // Next step is to verify that the array is not _mutated_ between the write and read.
    // We must be certain that the elements and state of the array is what we think it is
    // at the point of the read. For this reason we must assert no assignments to properties
    // happen and no arbitrary methods are called on the array (.pop .splice etc).

    if (arrMeta.reads.length === 1) {
      // This is the only read so it can not have mutated
    }
    else if (arrMeta.singleScoped) {
      // The read is sequential to the write and since it's a single
      // scoped, it there can not be any other reads in between.
    }
    else if (checkedForSpiesBetween) {
      // We already had to confirm earlier that there were no spies between the write and the read so we're good here
    }
    else if (arrMeta.reads.every(anyRead => {
      // Ignore the target read
      if (anyRead === read) return true;
      // The array escapes. Anything can happen now.
      if (anyRead.parentNode.type !== 'MemberExpression') return false;
      // Calling `arr.splice(0, 1)` may alter the array
      if (anyRead.grandNode.type === 'CallExpression') return false;
      // Deleting a property may alter the array
      if (anyRead.grandNode.type === 'UnaryExpression' && anyRead.grandNode.operator === 'delete') return false;
      // Assigning to a property is bad news
      if (anyRead.grandNode.type === 'AssignmentExpression' && anyRead.grandProp === 'left') return false;
      // Hopefully anything else is fine?
      return true
    })) {
      // All usages of the array binding should be non-mutating
    }
    else {
      // Must confirm nothing between the write and read has side effects that
      // may mutate the array as a closure.
      todo('processArrayWriteReadImmutableBinding slow path');
      return;
    }

    // Ok. Ready to apply the method.
    processApplyArrayMethod(arrMeta, arrNode, write, read, writeRwIndex);
  }

  function processApplyArrayMethod(arrMeta, arrNode, write, read, writeRwIndex) {
    ASSERT(read.parentNode.type === 'MemberExpression' && read.parentProp === 'object', 'this was explicitly asserted above', read);
    if (read.grandNode.type === 'AssignmentExpression' && read.grandProp === 'left') {
      // Assignment to array property

      if (AST.isPrimitive(read.grandNode.right)) {
        // - `arr.foo = x`
        // - `arr[foo] = x`
        vlog(' - RHS is a primitive');
        if (read.parentNode.computed) {
          // `arr[foo] = 123`
          vlog(' - Computed property write on the array. We can inline certain literals');
          if (AST.isNumberValueNode(read.parentNode.property)) {
            const value = AST.getPrimitiveValue(read.parentNode.property);
            vlog(' - The property is a number:', value, ', arr element count:', arrNode.elements.length);
            if (value >= 0 && value <= arrNode.elements.length) {
              rule('Assignment to index properties of array literals can be inlined');
              example('const arr = []; arr[0] = 100', 'const arr = [100]');
              before(write.blockBody[write.blockIndex]);
              before(read.blockBody[read.blockIndex]);

              arrNode.elements[value] = read.grandNode.right;
              queue.push({
                index: read.blockIndex,
                func: () => read.blockBody.splice(read.blockIndex, 1),
              });
              read.blockBody[read.blockIndex] = AST.emptyStatement();

              after(write.blockBody[write.blockIndex]);
              after(read.blockBody[read.blockIndex]);

              updated += 1;
              return;
            }
          }
        }
        else {
          // `arr.foo = x`
          // Main goal is checking assignment to .length
          if (read.parentNode.property.name === 'length') {
            // This should be safe to do, provided the len is not too excessive and we pop the elements and whatever.
            // I think, worst case, with normalized code, this could change which var triggers a TDZ?

            if (!AST.isNumberLiteral(read.grandNode.right)) {
              vlog('  - not assigning a number to arr.length, bailing');
              return;
            }

            const value = AST.getPrimitiveValue(read.grandNode.right);
            if (!(value >= 0) || !isFinite(value)) {
              vlog('  - assigning an impossible value to arr.length, bailing');
              return;
            }

            if (value === arrNode.elements.length) {
              // Noop...? Not likely to happen but while we're here let's drop it...

              rule('Assigning the same len to an array.length immediately after decl is ... drop it');
              example('const arr = [1, 2, 3]; arr.length = 3;', 'const arr = [1, 2, 3];');
              before(write.blockBody[write.blockIndex]);
              before(read.blockBody[read.blockIndex]);

              read.blockBody[read.blockIndex] = AST.emptyStatement();

              after(write.blockBody[write.blockIndex]);
              after(read.blockBody[read.blockIndex]);

              updated += 1;
              return;
            }

            if (value < arrNode.elements.length) {
              rule('Assigning a smaller len to arr.length right after its decl should shrink the decl');
              example('const arr = [1, 2, 3, 4, 5]; arr.length = 3;', '{ 4; 5; } const arr = [1, 2, 3];');
              before(write.blockBody[write.blockIndex]);
              before(read.blockBody[read.blockIndex]);

              // We do have to outline the remaining vars to preserve TDZ semantics
              // To prevent breaking indexes, we are going to replace the read with reads to
              // the pruned array elements. This should preserve TDZ order, not change TDZ semantics
              // and not mess with other index references until we go through phase1 again.

              queue.push({
                index: read.blockIndex,
                func: () => {
                  read.blockBody.splice(read.blockIndex, 1, ...arrNode.elements.slice(value));
                  arrNode.elements.length = value;
                }
              })

              after(write.blockBody[write.blockIndex]);
              after(read.blockBody[read.blockIndex]);

              updated += 1;
              addedSequence = true;
              return;
            }

            ASSERT(value >= arrNode.elements.length, 'len should be extended now');
            if (value - arrNode.elements.length < 10) {
              // 10 is an arbitrary limit. I'm not sure when this is actually relevant but ok we can so let's do it.

              rule('Assigning a bigger len to arr.length right after its decl should grow the decl');
              example('const arr = [1, 2]; arr.length = 4;', 'const arr = [1, 2, , ,];');
              before(write.blockBody[write.blockIndex]);
              before(read.blockBody[read.blockIndex]);

              // We do have to outline the remaining vars to preserve TDZ semantics
              // In this case we're in a unique position that we have two back to back statements.
              // So to prevent breaking indexes, we are going to replace the read with reads to
              // the pruned array elements. This should preserve TDZ order, not change TDZ semantics
              // and not mess with other index references until we go through phase1 again.

              for (let i=arrNode.elements.length; i<value; ++i) {
                arrNode.elements.push(null); // Gotta be nulls.
              }

              after(write.blockBody[write.blockIndex]);
              after(read.blockBody[read.blockIndex]);

              updated += 1;
              return;
            } else {
              todo('Assigning a much bigger value to arr.length than the len', value, arrNode.elements.length);
              return;
            }
          }
        }
        return;
      }

      if (read.parentNode.property.name === 'length') {
        // If the rhs is not a concrete primitive then I'm not so sure we can get
        // a reasonable value to actually assign at all. Maybe some edge cases...
        return;
      }

      vlog(' - RHS is NOT a primitive so this is more complicated');

      // If the array is not a closure, not accessed between decl and write, and the rhs can be tracked, then it should be safe to inline
      // We can start with the simple case: the write happens immediately after the decl
      if (write.blockBody === read.blockBody && write.blockIndex+1 === read.blockIndex) {
        // The read is on the next line from the decl so it must be safe to consolidate, regardless of rhs
        // - `const arr = []; arr.foo = x`
        // - `const arr = []; arr[foo] = x`

        // One other case to consider is assigning to a numbered property that is "way" out of range `arr[1e100] = 1`, whatever "Way" is.

        if (read.parentNode.computed) {
          // - `const arr = []; arr[foo] = x`
          vlog(' - Computed property mutation with non-primitive rhs on the array. We can inline the rhs in some cases');
          if (AST.isPrimitive(read.parentNode.property)) {
            const value = AST.getPrimitiveValue(read.parentNode.property);
            vlog(' - The property is a primitive:', value);
            if (typeof value === 'number' && value >= 0 && value <= arrNode.elements.length) {
              vlog(' - It is a number that is either in the current range of the array or one bigger:', value, '<=', arrNode.elements.length);

              rule('Assignment of complex rhs to index properties of array immediately after declaring the array can be inlined');
              example('const arr = []; arr[0] = xyz', 'const arr = [xyz]');
              before(write.blockBody[write.blockIndex]);
              before(read.blockBody[read.blockIndex]);

              arrNode.elements[value] = read.grandNode.right;
              queue.push({
                index: read.blockIndex,
                func: () => read.blockBody.splice(read.blockIndex, 1),
              });
              read.blockBody[read.blockIndex] = AST.emptyStatement();

              after(write.blockBody[write.blockIndex]);
              after(read.blockBody[read.blockIndex]);

              updated += 1;
              return;
            } else {
              // We only allow to write within range of declaration, or one above it
              // TODO: we could extend this by a couple and elide the rest. But where to draw the line?
              // - `const arr = []; arr[1e100] = bar;`
              // - `const arr = []; arr[3] = bar;`
              // - `const arr = []; arr[-1] = bar;`
              vlog('  - Assignment to array index that is oob; bailing');
              return;
            }
          } else {
            // - `arr[foo] = bar`
            // We don't know the concrete value of `foo` so we can't inline anything here.
            vlog('  - Assignment to property that is not primitive; bailing');
            return;
          }
        } else {
          // - `arr.foo = x`
          // Note: even `arr.length = x` is not workable since we must know what x resolves to in order to apply it here
          vlog('  - Assignment of complex rhs to non-index property cant be inlined, bailing');
          return;
        }
      } else {
        // This can work when:
        // - the decl and read have same scope
        // - the there's no loop/catch/if/else boundary between the decl and the write
        // - no abrubt completions either (`const arr; break; arr[0] = 1;` unlikely but possible as a temporary artifact)
        // - the rhs can be guaranteed to have no mutations/decls between the arr decl and the read
        // - I think the above rules imply the array decl can read the rhs as well
        // But it's a lot of work for a relatively edge case so ...
        todo('arr_mutation: implement array inlining analysis stuff')
        return;
      }
      return;
    } // assignment to arr prop

    //if (read.grandNode.type !== 'CallExpression') return vlog('- bail: Not calling a method, not accessing .length', read.grandNode.type);

    vlog(' - Property READ on the array:', read.parentNode.property.name);
    if (read.parentNode.computed) {
      // `arr[foo]`
      // `arr[foo]()`
      vlog(' - Computed property read on the array. We can inline certain literals');
      todo('inline computed array property read');
    }
    else {
      // `arr.foo`
      // `arr.foo()`
      processRegularPropReadOnPredictableArray(read, arrNode, write, arrMeta.name, arrMeta);
    }
  }

  function processRegularPropReadOnPredictableArray(nextRead, arrayLiteralNode, write, arrayName, arrayMeta) {
    // Note: the array is not guaranteed to be immutable !!
    //       Only that at read time, this is the state of the array, as written at write time

    switch (nextRead.parentNode.property.name) {
      case 'length': {
        // I think this is unsafe? What if code gets moved. TODO
        vlog('- bail: not sure if array.length is safe to inline');
        return;
      }
      case 'pop': {
        // Note: if `pop` logic fails here, also fix `reverse` below.

        if (nextRead.grandNode.type === 'CallExpression') {
          // These are a bit annoying because we need to reach to the grand-grand parent
          // node to replace the call and we don't store that by default.
          // Instead, for now, we'll check some cases on the statement level.

          const arrNode = write.parentNode.init;
          if (arrNode.elements.length === 0) {
            rule('Calling .pop on an empty array literal resolves to undefined');
            example('const arr = []; arr.pop();', 'const arr = []; undefined;');
            before(write.blockBody[write.blockIndex]);
            before(nextRead.blockBody[nextRead.blockIndex]);

            const newNode = nextRead.grandNode.arguments.length ? AST.sequenceExpression(nextRead.grandNode.arguments.concat([AST.identifier('undefined')])) : AST.identifier('undefined');
            if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
              if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
                // Call was a statement
                nextRead.blockBody[nextRead.blockIndex].expression = newNode;
              }
              else if (
                nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' &&
                nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode
              ) {
                // Call was assigned
                nextRead.blockBody[nextRead.blockIndex].expression.right = newNode;
              }
              else {
                // what normalized cases are left?
                TODO
              }
            }
            else if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
              // Call was init of a binding decl
              ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init');
              nextRead.blockBody[nextRead.blockIndex].declarations[0].init = newNode;
            }
            else {
              TODO
            }

            after(write.blockBody[write.blockIndex]);
            after(nextRead.blockBody[nextRead.blockIndex]);
            updated += 1;
            if (nextRead.grandNode.arguments.length) addedSequence = true; // Eliminated useless .pop() args
            return;
          }
          else {
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
              } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
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
            updated += 1;
            if (nextRead.grandNode.arguments.length) addedSequence = true; // Eliminated useless .pop() args
            return;
          }
        }
        else {
          vlog('- bail: Read .pop but did not call it');
          // TODO: replace it with $array_pop
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
              } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
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
            updated += 1;
            if (nextRead.grandNode.arguments.length) addedSequence = true; // Eliminated useless .shift() args
            return;
          }
          else if (arrNode.elements.every(enode => enode?.type !== 'SpreadElement')) {
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
              } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
                // Call was assigned
                nextRead.blockBody[nextRead.blockIndex].expression.right = newNode;
              } else {
                // what normalized cases are left?
                console.log(nextRead.blockBody[nextRead.blockIndex].expression)
                console.log(nextRead.grandNode)
                TODO
              }
            } else if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
              // Call was init of a binding decl
              ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations.length === 1 && nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code the call must be the init', nextRead.blockBody[nextRead.blockIndex]);
              nextRead.blockBody[nextRead.blockIndex].declarations[0].init = newNode;
            } else {
              TODO
            }

            after(write.blockBody[write.blockIndex]);
            after(nextRead.blockBody[nextRead.blockIndex]);
            updated += 1;
            if (nextRead.grandNode.arguments.length) addedSequence = true; // Eliminated useless .shift() args
            return;
          }
        } else {
          vlog('- bail: Read .shift but did not call it');
          // TODO: replace it with $array_shift
          return;
        }
        break;
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
                nextRead.blockBody[nextRead.blockIndex] = AST.emptyStatement();
              } else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
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
                nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' &&
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
          // TODO: replace it with $array_push
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
              }
              else if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' && nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode) {
                // Call was assigned
                nextRead.blockBody[nextRead.blockIndex].expression.right = AST.literal(arrayLiteralNode.elements.length);
              }
              else {
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
                nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' &&
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
          // TODO: replace it with $array_unshift
          return;
        }
        break;
      }
      case 'slice': {
        if (
          nextRead.grandNode.type === 'CallExpression' &&
          // we only need up to the first two arguments. The rest is not relevant to the call
          (nextRead.grandNode.arguments.length === 0 || AST.isPrimitive(nextRead.grandNode.arguments[0])) &&
          (nextRead.grandNode.arguments.length === 1 || AST.isPrimitive(nextRead.grandNode.arguments[1])) &&
          // Idents are tricky because their refs may have changed between the original array literal and this slice
          arrayLiteralNode.elements.every(enode => !enode || AST.isPrimitive(enode))
        ) {
          // Doing an array.slice on an array literal is predictable

          rule('Array slice on a binding known to be an array literal containing primitives can be copied');
          example('const arr = [1, 2, undefined, "foo"]; f(); $(arr.slice(0));', 'const arr = [1, 2, undefined, "foo"]; f(); $([1, 2, undefined, "foo"]);');
          example('const arr = [1, 2, undefined, "foo"]; f(); x = $([1, 2, undefined, "foo"]);');
          example('const arr = [1, 2, undefined, "foo"]; f(); const x = $([1, 2, undefined, "foo"]);');
          before(nextRead.blockBody[nextRead.blockIndex]);

          const clone = AST.arrayExpression(
            arrayLiteralNode.elements
            .slice(
              nextRead.grandNode.arguments[0] ? AST.getPrimitiveValue(nextRead.grandNode.arguments[0]) : undefined,
              nextRead.grandNode.arguments[1] ? AST.getPrimitiveValue(nextRead.grandNode.arguments[1]) : undefined
            )
            .map(e => e && AST.cloneSimple(e)));

          if (
            nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration' &&
            nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode
          ) {
            // ex: tests/cases/arr_mutation/slice_const.md
            nextRead.blockBody[nextRead.blockIndex].declarations[0].init = clone;
          }
          else if (nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement') {
            if (
              nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression' &&
              nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode
            ) {
              // ex: tests/cases/arr_mutation/slice_assign.md
              nextRead.blockBody[nextRead.blockIndex].expression.right = clone;
            }
            else if (nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode) {
              // ex: tests/cases/arr_mutation/slice_stmt.md
              nextRead.blockBody[nextRead.blockIndex].expression = clone;
            }
            else {
              ASSERT(false, 'What expr case is this?', nextRead)
            }
          } else {
            ASSERT(false, 'What case is this?', nextRead)
          }

          after(nextRead.blockBody[nextRead.blockIndex]);
          ++updated;
          return true;

          // Should be one of three cases
        }

        break;
      }
      case 'join': {
        // We can do this when:
        // - the array is read only once, or when we can guarantee it is not accessed between the decl and this read
        // - the first argument of the call can be fully resolved (we currently only support the trivial isPrimitive check)
        // - the concrete values of all elements of the array can be resolved

        if (nextRead.grandNode.type !== 'CallExpression') {
          todo('$array_join but it is not called?');
        }
        else if (nextRead.grandNode.arguments[0] && !AST.isPrimitive(nextRead.grandNode.arguments[0])) {
          todo('calling $array_join when the first arg is not a primitive');
        }
        else if (!arrayLiteralNode.elements.every(e => !e || AST.isPrimitive(e))) {
          todo('calling $array_join when the array is not just primitives');
        }
        else if (arrayMeta.writes.length !== 1) {
          todo('calling $array_join on an array that is not a constant');
        }
        else if (arrayMeta.reads.length !== 1) {
          todo('calling $array_join on an array that has other reads, must verify they dont mutate the array first');
        }
        else {
          rule('Calling array.join on an array that contains only primitives, with a known argument, can resolve to a string');
          example('[1, 2, "a", 3].join("yo")', '"1yo2yoayo3"');
          before(nextRead.blockBody[nextRead.blockIndex]);

          const str = arrayLiteralNode
          .elements
          .map(e => e ? AST.getPrimitiveValue(e) : '')
          .join(nextRead.grandNode.arguments[0] ? AST.getPrimitiveValue(nextRead.grandNode.arguments[0]) : ',');
          // Now replace the call with this string literal

          const newNode = AST.primitive(str);

          // Rare case where grandNode does not suffice; we need the parent of the grand node to replace the whole call.
          // In normalized code this can only be three things: expr stmt call, expr stmt assign call, var decl init call

          if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
            ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code, calls can not be nested so it must be the init');
            nextRead.blockBody[nextRead.blockIndex].declarations[0].init = newNode;
          } else {
            ASSERT(nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement');
            if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression') {
              ASSERT(nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode, 'in normalized code, if expr stmt assign, a call must be the rhs');
              nextRead.blockBody[nextRead.blockIndex].expression.right = newNode;
            } else {
              ASSERT(nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode, 'in normalized code, if expr stmt and not assign, then a call must be the expr itself');
              nextRead.blockBody[nextRead.blockIndex].expression = newNode;
            }
          }

          if (nextRead.grandIndex < 0) nextRead.grandNode[nextRead.grandProp] = newNode;
          else nextRead.grandNode[nextRead.grandProp][nextRead.grandIndex] = newNode;

          after(nextRead.blockBody[nextRead.blockIndex]);
          ++updated;
          return true;
        }
        break;
      }
      case 'reverse': {
        // Logic is same as `pop` above. If this breaks, fix that too.

        if (nextRead.grandNode.type === 'CallExpression') {
          // These are a bit annoying because we need to reach to the grand-grand parent
          // node to replace the call and we don't store that by default.
          // Instead, for now, we'll check some cases on the statement level.

          const arrNode = write.parentNode.init;
          if (arrNode.elements.length === 0) {
            rule('Calling .reverse on an empty array literal is a noop');
            example('const arr = []; const y = arr.reverse();', 'const arr = []; const y = arr;');
            before(write.blockBody[write.blockIndex]);
            before(nextRead.blockBody[nextRead.blockIndex]);

            // .reverse() returns the array it mutated so we should be able to leave the context

            // Rare case where grandNode does not suffice; we need the parent of the grand node to replace the whole call.
            // In normalized code this can only be three things: expr stmt call, expr stmt assign call, var decl init call

            if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
              ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code, calls can not be nested so it must be the init');
              nextRead.blockBody[nextRead.blockIndex].declarations[0].init = nextRead.parentNode.object;
            } else {
              ASSERT(nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement');
              if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression') {
                ASSERT(nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode, 'in normalized code, if expr stmt assign, a call must be the rhs');
                nextRead.blockBody[nextRead.blockIndex].expression.right = nextRead.parentNode.object;
              } else {
                ASSERT(nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode, 'in normalized code, if expr stmt and not assign, then a call must be the expr itself');
                nextRead.blockBody[nextRead.blockIndex].expression = nextRead.parentNode.object;
              }
            }

            after(write.blockBody[write.blockIndex]);
            after(nextRead.blockBody[nextRead.blockIndex]);
            updated += 1;
            return;
          }
          else {
            rule('Calling .reverse on an array literal without changes in between can be resolved');
            example('const arr = [1, 2, 3]; const y = arr.reverse();', 'const arr = [3, 2, 1]; const y = arr;');
            before(write.blockBody[write.blockIndex]);
            before(nextRead.blockBody[nextRead.blockIndex]);

            // .reverse() returns the array it mutated so we should be able to leave the context

            // Rare case where grandNode does not suffice; we need the parent of the grand node to replace the whole call.
            // In normalized code this can only be three things: expr stmt call, expr stmt assign call, var decl init call

            if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
              ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code, calls can not be nested so it must be the init');
              nextRead.blockBody[nextRead.blockIndex].declarations[0].init = nextRead.parentNode.object;
            } else {
              ASSERT(nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement');
              if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression') {
                ASSERT(nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode, 'in normalized code, if expr stmt assign, a call must be the rhs');
                nextRead.blockBody[nextRead.blockIndex].expression.right = nextRead.parentNode.object;
              } else {
                ASSERT(nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode, 'in normalized code, if expr stmt and not assign, then a call must be the expr itself');
                nextRead.blockBody[nextRead.blockIndex].expression = nextRead.parentNode.object;
              }
            }

            arrayLiteralNode.elements.reverse();

            after(write.blockBody[write.blockIndex]);
            after(nextRead.blockBody[nextRead.blockIndex]);
            updated += 1;
            return;
          }
        }
        else {
          vlog('- bail: Read .pop but did not call it');
          // TODO: replace it with $array_pop
          return;
        }
      }
      case 'toString': {
        // We can do this when:
        // - the array is read only once, or when we can guarantee it is not accessed between the decl and this read
        // - the first argument of the call can be fully resolved (we currently only support the trivial isPrimitive check)
        // - the concrete values of all elements of the array can be resolved
        // Note: array.toString is just an alias for array.join(',') (in the spec!)

        if (nextRead.grandNode.type !== 'CallExpression') {
          todo('array.toString that isnt called?');
        } else if (!arrayLiteralNode.elements.every(e => !e || AST.isPrimitive(e))) {
          todo('array.tostring on an array init where not all elements are primitives');
        } else if (arrayMeta.writes.length !== 1) {
          todo('array.toString on an init is mutated?');
        } else if (arrayMeta.reads.length !== 1) {
          todo('array.toString on an init that is read more than once, need to verify none of them mutate the array');
        } else {
          // - `const arr = [1, 2, 3]; $(arr.toString());`
          rule('Calling .toString on an array with only primitives can be resolved');
          example('const arr = [1, 2, 3]; $(arr.toString());', 'const arr = [1, 2, 3]; $("1,2,3");');
          before(nextRead.blockBody[nextRead.blockIndex]);

          const str = arrayLiteralNode
          .elements
          .map(e => e ? AST.getPrimitiveValue(e) : '')
          .toString();

          const newNode = AST.primitive(str);

          if (nextRead.blockBody[nextRead.blockIndex].type === 'VariableDeclaration') {
            ASSERT(nextRead.blockBody[nextRead.blockIndex].declarations[0].init === nextRead.grandNode, 'in normalized code, calls can not be nested so it must be the init');
            nextRead.blockBody[nextRead.blockIndex].declarations[0].init = newNode;
          } else {
            ASSERT(nextRead.blockBody[nextRead.blockIndex].type === 'ExpressionStatement');
            if (nextRead.blockBody[nextRead.blockIndex].expression.type === 'AssignmentExpression') {
              ASSERT(nextRead.blockBody[nextRead.blockIndex].expression.right === nextRead.grandNode, 'in normalized code, if expr stmt assign, a call must be the rhs');
              nextRead.blockBody[nextRead.blockIndex].expression.right = newNode;
            } else {
              ASSERT(nextRead.blockBody[nextRead.blockIndex].expression === nextRead.grandNode, 'in normalized code, if expr stmt and not assign, then a call must be the expr itself');
              nextRead.blockBody[nextRead.blockIndex].expression = newNode;
            }
          }

          after(nextRead.blockBody[nextRead.blockIndex]);
          ++updated;
          return true;
        }
        break;
      }
    }
  }
}
