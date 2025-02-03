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
}

function processAttempt(fdata) {
  // Find arrays where the first read is a method call
  // TODO: Find arrays that call methods before any other potential mutation happens to them (ie. reading index prop is fine, escaping is not)

  let updated = 0;
  let addedSequence = false; // Have to restart if we added a sequence. Otherwise we won't.

  const ast = fdata.tenkoOutput.ast;
  let nodes = 0;
  let counter = 0;
  let start = Date.now();
  let backing = 0;
  walk(walker, ast, 'ast');
  log('- Analyzed', counter, 'arrays out of', nodes, 'nodes, spent', Date.now() - start, 'ms');

  function walker(arrayLiteralNode, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    ++nodes;
    if (arrayLiteralNode.type !== 'ArrayExpression') return;
    ++counter;
    vgroup('- Array @', +arrayLiteralNode.$p.pid);
    _walker(arrayLiteralNode, beforeWalk, nodeType, path);
    vgroupEnd();
  }
  function _walker(arrayLiteralNode, beforeWalk, nodeType, path) {

    // In normalized code the array should be the rhs of an assignment or the init of a var decl

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const grandNode = path.nodes[path.nodes.length - 3];
    const grandProp = path.props[path.props.length - 2];
    const grandIndex = path.indexes[path.indexes.length - 2];
    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

    if (!(parentNode.type === 'VariableDeclarator' && parentProp === 'init')) {
      vlog('- bail: can only handle array literals that are init to a const decl');
      return;
    }
    if (grandNode.kind !== 'const') {
      vlog('- bail: was not a const');
      return;
    }

    const arrayName = parentNode.id.name;
    const arrayMeta = fdata.globallyUniqueNamingRegistry.get(arrayName);
    if (arrayMeta.writes.length !== 1) {
      // I dunno what this case might be but
      vlog('Bailing. Somehow this constant does not have exactly one write');
      return;
    }
    const orderIndex = arrayMeta.rwOrder.findIndex(n => n.node === parentNode.id);
    const write = arrayMeta.writes[0];
    ASSERT(write.action === 'write', 'the var decl was a write, this check should be kind of silly');
    ASSERT(write.parentNode.init === arrayLiteralNode, 'sanity and model consistency check');

    // We have an array that is the init of a var decl.
    // Verify that the binding doesn't escape.

    // We first verify that the array is only used as the object in a member expression
    // We also have to double check that this member expression is never the arg of `delete`
    // Then there are a few paths
    // - member expression is only used in var inits or assignments (or expr statements, where it's dead code)
    //   - simplest case. no mutations possible.
    // - member expression is also seen as the callee of a call expression
    //   - array may mutate. only inline reads with the same loop and func parent as the var decl

    // In this case, that means all usages must be reading a property on the object
    // Computed keys don't matter here. We ignore proto mutations and proxies.
    // Assuming we handle getters and setters, we shouldn't need to care much here.
    // Method calls can mutate the array though. And in a loop, that means the loop changes.

    const allSimple = arrayMeta.reads.every(read => {
      if (read.parentNode.type !== 'MemberExpression' || read.parentProp !== 'object') {
        vlog('bail: at least one read escaped as it was not a member', read.parentNode.type)
        return false;
      }

      // The delete check is subsumed by next context check
      //if (read.grandNode.type === 'UnaryExpression' && read.grandNode.op === 'delete') {
      //  vlog('bail: at least one read deleted a property');
      //  return false;
      //}

      if (
        (read.grandNode.type === 'ExpressionStatement') ||
        (read.grandNode.type === 'AssignmentExpression' && read.grandNode.right === read.node) ||
        (read.grandNode.type === 'VariableDeclaration' && read.grandNode.declarations[0].init !== read.node)
      ) {
        return true; // Continue searching
      }

      //if (
      //  read.grandNode.type === 'CallExpression' &&
      //  read.grandNode.callee === read.parentNode &&
      //  read.innerLoop === write.innerLoop &&
      //  read.pfuncNode === write.pfuncNode
      //) {
      //  // method call on the array in same loop and func
      //  someCall = true;
      //  return true; // Continue searching
      //}
      //
      //vlog('Found an unsupported ref used in a:', read.grandNode, '.', read.grandProp, '>', read.parentNode, '.', read.parentProp, '. Bailing for now.')
      //escapes = true;
      //return false; // Unknown reference case. Maybe we can support it but for now we bail.
    });

    if (allSimple) {
      vlog('all reads are simple prop reads, process any read that can reach the write');

      // All reads should be safe to resolve now
      arrayMeta.reads.forEach((read, i) => {
        // Only okay for the reads that can reach the write
        if (!read.reachesWrites.size) {
          return vlog('bail: read could not reach write');
        }
        vgroup('- read', i);
        const r = haveRead(arrayName, arrayLiteralNode, arrayMeta, write, read);
        vgroupEnd();
        return r;
      });

      return;
    }

    vlog('Not all reads were simple property reads so we must fallback to less efficient back2back checks');

    // Keep searching until you find a rw that is in the same func. Must appear after the binding.
    // Then verify if that's a read in same loop/catch that can reach this without side effects
    let rwIndex = orderIndex;
    let nextRead = arrayMeta.rwOrder[rwIndex + 1];
    while (nextRead && nextRead.pfuncNode !== write.pfuncNode) {
      //console.log('- read/write not in same function scope, trying next rw', nextRead.pfuncNode.$p.pid, write.pfuncNode.$p.pid)
      ++rwIndex;
      nextRead = arrayMeta.rwOrder[rwIndex + 1];
    }
    if (!nextRead) return vlog('bail: there is no next read in same scope');
    if (nextRead?.action !== 'read') return vlog('bail: next ref in same scope is a write'); // Okay, next reference to this binding is not a read so we don't care

    // Confirm that both nodes are in the same loop, and catch "scope" because
    // otherwise we can't guarantee that the read even happens sequentially

    // Multiple writes. Requirements are more strict (TODO: relax certain cases)
    if (nextRead.innerLoop !== write.innerLoop) {
      // Refs in the header of a loop are considered to be inside that loop so must check this separately
      return vlog('- read/write not in same loop', nextRead.innerLoop, write.innerLoop);
    }
    if (nextRead.innerIf !== write.innerIf) {
      // Can't guarantee the write if one ref is inside an if-block while the other is not in the same if-block
      // Consider `const arr = [1,2]; A: { if ($) break A; else arr.push('fail'); } $(arr);`
      // -> This would end as `const arr = [1,2,'fail']; A: { ...} $arr)` which is invalid for the `if`-case.
      return vlog('- read/write not in same if', nextRead.innerIf, write.innerIf);
    }
    if (nextRead.innerElse !== write.innerElse) {
      // Can't guarantee the write if one ref is inside an else-block while the other is not in the same else-block
      // (See if-case for example)
      return vlog('- read/write not in same else', nextRead.innerElse, write.innerElse);
    }
    if (nextRead.innerCatch !== write.innerCatch) {
      // Can't guarantee the write if one ref is inside a catch while the other is not
      return vlog('- read/write not in same catch', nextRead.innerCatch, write.innerCatch);
    }

    return haveRead(arrayName, arrayLiteralNode, arrayMeta, write, nextRead);
  }

  function haveRead(arrayName, arrayLiteralNode, arrayMeta, write, nextRead) {

    // Must still verify that we're not in different branching

    vlog('Have an array decl init (pid =', arrayLiteralNode.$p.pid, ') and a read of that binding:', arrayName, ', or is it a property write?', nextRead.isPropWrite);

    // Now confirm there are no observable side effects between read and write

    //vlog('Walking sub-node for scan:');
    //source(write.blockBody[write.blockIndex]);
    //source(nextRead.blockBody[nextRead.blockIndex]);

    // Note: this check is to confirm if the array _might_ have changed between the decl and the read
    if (arrayMeta.writes.length === 1) {
      // We already verified that none of the reads escape.
      // Observable side effects are moot here because the only "use" is a property
      // read. The arr is not passed on anywhere by reference so we don't need to worry about visibility.
      vlog('Array binding only has one write. No need to scan for observable side effects.');
    } else {
      let bstart = Date.now();
      let has = hasObservableSideEffectsBetweenRefs(write, nextRead);
      backing += Date.now() - bstart;
      if (has) {
        vlog('  - bail: found at least one observable statement between read and write');
        return;
      }
    }

    vlog(' - ok. Determine how the array is being used and try to inline it');

    switch (nextRead.parentNode.type) {
      case 'MemberExpression': {
        if (nextRead.parentNode.object === nextRead.node) {
          if (nextRead.isPropWrite) {
            vlog(' - Property write on the array:', nextRead.parentNode.property.name);

            if (nextRead.grandNode.right.type === 'Identifier' && nextRead.grandNode.right.name === arrayName) {
              // - `const arr = []; arr[0] = arr`
              vlog('  - Assigning the array to one of its elements, recursion, EVIL, bailing');
              return;
            }

            if (AST.isPrimitive(nextRead.grandNode.right)) {
              vlog(' - RHS is a primitive');
              if (nextRead.parentNode.computed) {
                // `arr[foo] = x`
                vlog(' - Computed property write on the array. We can inline certain literals');
                if (AST.isPrimitive(nextRead.parentNode.property)) {
                  const value = AST.getPrimitiveValue(nextRead.parentNode.property);
                  vlog(' - The property is a primitive:', value);
                  if (typeof value === 'number' && value >= 0 && value <= arrayLiteralNode.elements.length) {
                    vlog(' - It is a number that is either in the current range of the array or one bigger:', value, arrayLiteralNode.elements.length);

                    rule('Assignment to index properties of array literals can be inlined');
                    example('const arr = []; arr[0] = 100', 'const arr = [100]');
                    before(write.blockBody[write.blockIndex]);
                    before(nextRead.blockBody[nextRead.blockIndex]);

                    arrayLiteralNode.elements[value] = nextRead.grandNode.right;
                    nextRead.blockBody[nextRead.blockIndex] = AST.emptyStatement();

                    after(write.blockBody[write.blockIndex]);
                    after(nextRead.blockBody[nextRead.blockIndex]);

                    updated += 1;
                    break;
                  }

                }
                //TODO
              } else {
                // `arr.foo = x`
                ASSERT(nextRead.parentNode.property.type === 'Identifier', 'non-computed must have ident, yes?');
                switch (nextRead.parentNode.property.name) {
                  case 'length': {
                    // This is unsafe unless back to back. Maybe some other cases can be covered as well...
                    if (write.blockBody === nextRead.blockBody && write.blockIndex+1 === nextRead.blockIndex) {
                      // This assignment is back to back so this should be safe to do, provided the
                      // len is not too excessive and we pop the elements and whatever.
                      // I think, worst case, with normalized code, this could change which var triggers a TDZ?

                      if (!AST.isNumberLiteral(nextRead.grandNode.right)) {
                        vlog('  - not assigning a number to arr.length, bailing');
                        return;
                      }

                      const value = AST.getPrimitiveValue(nextRead.grandNode.right);
                      if (!(value >= 0) || !isFinite(value)) {
                        vlog('  - assigning an impossible value to arr.length, bailing');
                        return;
                      }

                      if (value === arrayLiteralNode.elements.length) {
                        // Noop...? Not likely to happen but while we're here let's drop it...

                        rule('Assigning the same len to an array.length immediately after decl is ... drop it');
                        example('const arr = [1, 2, 3]; arr.length = 3;', 'const arr = [1, 2, 3];');
                        before(write.blockBody[write.blockIndex]);
                        before(nextRead.blockBody[nextRead.blockIndex]);

                        nextRead.blockBody[nextRead.blockIndex] = AST.emptyStatement();

                        after(write.blockBody[write.blockIndex]);
                        after(nextRead.blockBody[nextRead.blockIndex]);

                        updated += 1;
                        break;
                      }

                      if (value < arrayLiteralNode.elements.length) {
                        rule('Assigning a smaller len to arr.length right after its decl should shrink the decl');
                        example('const arr = [1, 2, 3, 4, 5]; arr.length = 3;', '{ 4; 5; } const arr = [1, 2, 3];');
                        before(write.blockBody[write.blockIndex]);
                        before(nextRead.blockBody[nextRead.blockIndex]);

                        // We do have to outline the remaining vars to preserve TDZ semantics
                        // In this case we're in a unique position that we have two back to back statements.
                        // So to prevent breaking indexes, we are going to replace the read with reads to
                        // the pruned array elements. This should preserve TDZ order, not change TDZ semantics
                        // and not mess with other index references until we go through phase1 again.

                        nextRead.blockBody[nextRead.blockIndex] = AST.expressionStatement(AST.sequenceExpression(...arrayLiteralNode.elements.slice(value)));
                        arrayLiteralNode.elements.length = value;

                        after(write.blockBody[write.blockIndex]);
                        after(nextRead.blockBody[nextRead.blockIndex]);

                        updated += 1;
                        addedSequence = true;
                        break;
                      }

                      ASSERT(value >= arrayLiteralNode.elements.length, 'len should be extended now');
                      if (value - arrayLiteralNode.elements.length < 10) {
                        // 10 is an arbitrary limit. I'm not sure when this is actually relevant but ok we can so let's do it.

                        rule('Assigning a bigger len to arr.length right after its decl should grow the decl');
                        example('const arr = [1, 2]; arr.length = 4;', 'const arr = [1, 2, , ,];');
                        before(write.blockBody[write.blockIndex]);
                        before(nextRead.blockBody[nextRead.blockIndex]);

                        // We do have to outline the remaining vars to preserve TDZ semantics
                        // In this case we're in a unique position that we have two back to back statements.
                        // So to prevent breaking indexes, we are going to replace the read with reads to
                        // the pruned array elements. This should preserve TDZ order, not change TDZ semantics
                        // and not mess with other index references until we go through phase1 again.

                        for (let i=arrayLiteralNode.elements.length; i<value; ++i) {
                          arrayLiteralNode.elements.push(null); // Gotta be nulls.
                        }

                        after(write.blockBody[write.blockIndex]);
                        after(nextRead.blockBody[nextRead.blockIndex]);

                        updated += 1;
                        break;
                      } else {
                        vlog('  - Assigning a much bigger value to arr.lenth than the len, bailing');
                        return;
                      }
                    } else {
                      vlog('  - bail: not safe to line array.length assignment when not backtoback, bailing');
                      return;
                    }
                  }
                }
              }
            } else {
              vlog(' - RHS is NOT a primitive so this is more complicated');

              // If the array is not a closure, not accessed between decl and write, and the rhs can be tracked, then it should be safe to inline
              // We can start with the simple case: the write happens immediately after the decl
              if (write.blockBody === nextRead.blockBody && write.blockIndex+1 === nextRead.blockIndex) {
                // The read is on the next line from the decl so it must be safe to consolidate, regardless of rhs
                // - `const arr = []; arr.foo = x`
                // - `const arr = []; arr[foo] = x`

                // One other case to consider is assigning to a numbered property that is "way" out of range `arr[1e100] = 1`, whatever "Way" is.

                if (nextRead.parentNode.computed) {
                  // - `const arr = []; arr[foo] = x`
                  vlog(' - Computed property mutation with non-primitive rhs on the array. We can inline the rhs in some cases');
                  if (AST.isPrimitive(nextRead.parentNode.property)) {
                    const value = AST.getPrimitiveValue(nextRead.parentNode.property);
                    vlog(' - The property is a primitive:', value);
                    if (typeof value === 'number' && value >= 0 && value <= arrayLiteralNode.elements.length) {
                      vlog(' - It is a number that is either in the current range of the array or one bigger:', value, '<=', arrayLiteralNode.elements.length);

                      rule('Assignment of complex rhs to index properties of array immediately after declaring the array can be inlined');
                      example('const arr = []; arr[0] = xyz', 'const arr = [xyz]');
                      before(write.blockBody[write.blockIndex]);
                      before(nextRead.blockBody[nextRead.blockIndex]);

                      arrayLiteralNode.elements[value] = nextRead.grandNode.right;
                      nextRead.blockBody[nextRead.blockIndex] = AST.emptyStatement();

                      after(write.blockBody[write.blockIndex]);
                      after(nextRead.blockBody[nextRead.blockIndex]);

                      updated += 1;
                      break;
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
            }
          } else {
            vlog(' - Property read on the array:', nextRead.parentNode.property.name);
            if (nextRead.parentNode.computed) {
              // `arr[foo]`
              vlog(' - Computed property read on the array. We can inline certain literals');
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
                  } else {
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

                  if (
                    (!nextRead.grandNode.arguments[0] || AST.isPrimitive(nextRead.grandNode.arguments[0])) &&
                    arrayLiteralNode.elements.every(e => !e || AST.isPrimitive(e)) &&
                    arrayMeta.writes.length === 1 &&
                    arrayMeta.reads.length === 1 // TODO: do the alternative check...
                  ) {
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
