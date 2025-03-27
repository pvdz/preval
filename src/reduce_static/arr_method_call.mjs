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

export function arrMethodCall(fdata) {
  group('\n\n\nChecking for array method calls to inline');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _arrMethodCall(fdata);
  groupEnd();

  return r;
}
function _arrMethodCall(fdata) {
  const queue = [];

  let updated = processAttempt(fdata, queue);

  log('');
  if (updated) {
    log('Array methods inlined:', updated, '. At least one change requires a restart to phase1');
    return {what: 'arrMethodCall', changes: updated, next: 'phase1'};
  }
  log('Array methods inlined: 0.');
}

function processAttempt(fdata) {
  // Find arrays where the first read is a method call
  // TODO: Find arrays that call methods before any other potential mutation happens to them (ie. reading index prop is fine, escaping is not)

  let updated = 0;

  const ast = fdata.tenkoOutput.ast;
  let nodes = 0;
  let counter = 0;
  let start = Date.now();
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

    if (!(parentNode.type === 'VarStatement' && parentProp === 'init')) {
      vlog('- bail: can only handle array literals that are init to a const decl');
      return;
    }
    if (parentNode.kind !== 'const') {
      vlog('- bail: was not a const', parentNode.kind);
      return;
    }

    if (arrayLiteralNode.elements.some(enode => enode?.type === 'SpreadElement')) {
      vlog('- bail: at least one element is a spread');
      return;
    }

    // - Array is a constant

    const arrayName = parentNode.id.name;
    const arrayMeta = fdata.globallyUniqueNamingRegistry.get(arrayName);
    if (arrayMeta.writes.length !== 1) {
      // I dunno what this case might be but
      vlog('Bailing. Somehow this constant does not have exactly one write');
      return;
    }

    const write = arrayMeta.writes[0];
    ASSERT(write.action === 'write', 'the var decl was a write, this check should be kind of silly');
    ASSERT(write.parentNode.init === arrayLiteralNode, 'sanity and model consistency check');

    let mutating = false;
    const calls = [];
    const allSafe = arrayMeta.reads.every(read => {
      // Doesn't matter which property is accessed, so computed prop or not is not relevant here
      if (read.parentNode.type !== 'MemberExpression' || read.parentProp !== 'object') {
        vlog('bail: at least one read escaped as it was not a member', read.parentNode.type)
        return false;
      }

      // This check subsumes delete, method-calls, assignments, and whatever else.
      // Assuming normalized code, this is what we want to filter down to.
      if (
        (read.grandNode.type === 'ExpressionStatement') ||
        (read.grandNode.type === 'AssignmentExpression' && read.grandNode.right === read.node) ||
        (read.grandNode.type === 'VarStatement' && read.grandNode.init !== read.node)
      ) {
        vlog('Found an unsupported ref used in a:', read.grandNode, '.', read.grandProp, '>', read.parentNode, '.', read.parentProp, '. Bailing for now.');
        return true; // Continue searching.
      }

      // Calling a method can be dangerous
      if (read.grandNode.type === 'CallExpression') {
        if (read.parentNode.computed) {
          // Can't reliably verify computed method calls. It may end up mutating
          // the array and make it unpredictable, throwing out various invariants.
          return false;
        }
        if (['concat', 'join', 'flat', 'slice', 'toReversed', 'toSorted', 'toSpliced'].includes(read.parentNode.property.name)) {
          calls.push({read, method: read.parentNode.property.name});
          return true;
        }
        if (['copyWithin', 'push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort', 'fill'].includes(read.parentNode.property.name)) {
          calls.push({read, method: read.parentNode.property.name});
          mutating = true;
          return true;
        }
        vlog('Unknown method being called, bailing;', read.parentNode.property.name);
        return false;
      }
    });

    if (allSafe && calls.length) {
      vlog('all reads have been verified to be safe, assuming', calls.length, 'calls verify too, and at least one is a method call');

      if (mutating) {
        // The array may be mutated at some point. Makes certain operations harder to predict and inline.
        vlog('TODO: array operations when the array may mutate')
        return;
      }
      else {
        // - Array is a constant
        // - Not escaping
        // - May have method calls but only to known non-mutating built-in methods

        arrayMeta.reads.forEach((read, i) => {
          // Only okay for the reads that can reach the write
          if (!read.reachesWrites.size) return vlog('- skip read: read could not reach write, TDZ?');
          if (read.grandNode.type !== 'CallExpression') return;

          vgroup('- read', i, '; method call;', read.parentNode.property.name);
          haveMethodCall(arrayName, arrayLiteralNode, arrayMeta, write, read);
          vgroupEnd();
        });
        return;
      }

      vlog('- bail: either the array escapes or it has no method calls');
      return;
    }

    // At some point I may want to implement the alt-path here. It'll look something like this. Not now.
    //
    //vlog('Not all reads were simple property reads so we must fallback to less efficient back2back checks');
    //
    //// Keep searching until you find a rw that is in the same func. Must appear after the binding.
    //// Then verify if that's a read in same loop/catch that can reach this without side effects
    //let rwIndex = orderIndex;
    //let nextRead = arrayMeta.rwOrder[rwIndex + 1];
    //while (nextRead && nextRead.pfuncNode !== write.pfuncNode) {
    //  //console.log('- read/write not in same function scope, trying next rw', nextRead.pfuncNode.$p.pid, write.pfuncNode.$p.pid)
    //  ++rwIndex;
    //  nextRead = arrayMeta.rwOrder[rwIndex + 1];
    //}
    //if (!nextRead) return vlog('bail: there is no next read in same scope');
    //if (nextRead?.action !== 'read') return vlog('bail: next ref in same scope is a write'); // Okay, next reference to this binding is not a read so we don't care
    //
    //// Confirm that both nodes are in the same loop, and catch "scope" because
    //// otherwise we can't guarantee that the read even happens sequentially
    //
    //// Multiple writes. Requirements are more strict (TODO: relax certain cases)
    //if (nextRead.innerLoop !== write.innerLoop) {
    //  // Refs in the header of a loop are considered to be inside that loop so must check this separately
    //  return vlog('- read/write not in same loop', nextRead.innerLoop, write.innerLoop);
    //}
    //if (nextRead.innerIf !== write.innerIf) {
    //  // Can't guarantee the write if one ref is inside an if-block while the other is not in the same if-block
    //  // Consider `const arr = [1,2]; A: { if ($) break A; else arr.push('fail'); } $(arr);`
    //  // -> This would end as `const arr = [1,2,'fail']; A: { ...} $arr)` which is invalid for the `if`-case.
    //  return vlog('- read/write not in same if', nextRead.innerIf, write.innerIf);
    //}
    //if (nextRead.innerElse !== write.innerElse) {
    //  // Can't guarantee the write if one ref is inside an else-block while the other is not in the same else-block
    //  // (See if-case for example)
    //  return vlog('- read/write not in same else', nextRead.innerElse, write.innerElse);
    //}
    //if (nextRead.innerCatch !== write.innerCatch) {
    //  // Can't guarantee the write if one ref is inside a catch while the other is not
    //  return vlog('- read/write not in same catch', nextRead.innerCatch, write.innerCatch);
    //}
    //
    //return haveRead(arrayName, arrayLiteralNode, arrayMeta, write, nextRead);

  }

  function haveMethodCall(arrayName, arrayLiteralNode, arrayMeta, write, read) {
    // This array should be safe and not mutate and only certain methods are called on it
    // Note that its elements have not yet been verified. Other than a quick not-SpreadElement check.
    switch (read.parentNode.property.name) {
      case 'concat': {
        const concatCallNode = read.grandNode;

        // Confirm its own elements are supproted

        function hasBadConcatElement(arrNode) {
          // Assumes the SpreadElement case was already ruled out before
          return arrNode.elements.some(enode => {
            if (!enode) return false; // Elided elements are okay: [,]
            if (AST.isPrimitive(enode)) return false; // Primitive elements are okay: [1]
            ASSERT(enode.type === 'Identifier', 'since it cant be spread, im not sure what else it could be in normalized code', enode.type);

            // - `const x = []; const y = [x]; const z = []; const arr = z.concat(y);`
            // enode = x in y. Confirm if _this_ place can reach the x ident.
            // This would be necessary to replace the .concat() with a fresh array here.
            const meta = fdata.globallyUniqueNamingRegistry.get(enode.name);
            // This can reach x if the decl of x (whatever it is) has a blockChain that is a prefix of this node's blockChain
            if (!concatCallNode.$p.blockChain.startsWith(meta.varDeclRef.node.$p.blockChain)) {
              return true; // Can not reach that array so we must bail
            }
            // Okay
            return false;
          });
        }

        if (hasBadConcatElement(arrayLiteralNode)) {
          vlog('- bail: the ctx array has elements for which we dont support concat right now');
          return
        }

        // For every arg
        // - Verify that the arg is an array (-> must be ident in normalized code, ignore edge cases)
        // - Verify that this array is a constant that does not escape
        // - Verify that this array only contains primitives
        const argArrays = [];
        if (concatCallNode.arguments.some(concatArg => {
          if (!concatArg.type) {
            vlog('- bail: at least one arg to .concat was not an ident');
            return true;
          }
          // If the context and arg are arrays with primitives then create a new one with those primitives to replace the call.
          const concatArgMeta = fdata.globallyUniqueNamingRegistry.get(concatArg.name);
          if (!concatArgMeta.isConstant || concatArgMeta.writes.length !== 1) {
            vlog('- bail: at least one .concat arg was not a constant;', concatArg.name);
            return true;
          }
          if (concatArgMeta.varDeclRef.node.type !== 'ArrayExpression') {
            vlog('- bail: at least one .concat arg was not an array literal;', concatArg.name, concatArgMeta.varDeclRef.node.type);
            return true;
          }

          const allSafe = concatArgMeta.reads.every(read => {
            // Doesn't matter which property is accessed, so computed prop or not is not relevant here
            if (read.parentNode.type !== 'MemberExpression' || read.parentProp !== 'object') {
              if (read.parentNode === concatCallNode) {
                // Since we already validated the concatCallNode, we should be able to assume that this reference was the arg that
                // we are examining here (or maybe a dupe but that's fine too; it's the call that we need to be certain about).
                return true;
              }

              vlog('- bail: at least one .concat arg has at least one escaping read because it was not a member;', concatArg.name, read.parentNode.type);
              return false;
            }

            // This check subsumes delete, method-calls, assignments, and whatever else.
            // Assuming normalized code, this is what we want to filter down to.
            if (
              (read.grandNode.type === 'ExpressionStatement') ||
              (read.grandNode.type === 'AssignmentExpression' && read.grandNode.right === read.node) ||
              (read.grandNode.type === 'VarStatement' && read.grandNode.init !== read.node)
            ) {
              vlog('- bail: at least one .concat arg was used in an unsupported way:', concatArg.name, read.grandNode, '.', read.grandProp, '>', read.parentNode, '.', read.parentProp);
              return true; // Continue searching.
            }

            vlog('bail: at least one .concat arg was an array that escaped at least once;', concatArg.name, read.grandNode.type);
            return false;
          });
          if (!allSafe) {
            return true;
          }

          // Confirm the elements of the concatenated array. Must be all idents or primitives. All idents must be reachable from here.
          if (hasBadConcatElement(concatArgMeta.varDeclRef.node)) {
            vlog('- bail: an arg array has elements for which we dont support concat right now;', concatArg.name);
            return true;
          }

          argArrays.push(concatArgMeta.varDeclRef.node);

          // - arg is a constant array literal
          // - arg does not escape, only used as plain member expression reads (not for delete/call/assign)
          // - all elements of that array are a primitive or elided
          return false;
        })) {
          return;
        }

        // - Array is a constant
        // - Only contains primitives or elided elements
        // - This is a .concat() call on that array
        // - All args are refs to array literals
        // - All referred array literals are constants that don't escape
        // - All referred array literals contain only primitives
        // = We can inline the .concat() safely by replacing it with a new array

        rule('Calling concat on two arrays that dont escape and only have primitives can be inlined');
        example('const a = [1,2,3]; const b = [4,5,6]; const c = a.concat(b);', 'const a = [1,2,3]; const b = [4,5,6]; const c = [1,2,3,4,5,6];');
        before(read.blockBody[read.blockIndex]);

        const values = arrayLiteralNode.elements.map(enode => enode && AST.cloneSimple(enode));
        argArrays.forEach(arr => {
          arr.elements.forEach(enode => values.push(enode && AST.cloneSimple(enode)));
        });

        const finalNode = AST.arrayExpression(values);

        // This is normalized code and a function call. There are three possible ways to use a func call: var, assign, statement
        const stmt = read.blockBody[read.blockIndex];
        if (stmt.type === 'VarStatement' && stmt.init === concatCallNode) {
          stmt.init = finalNode;
        }
        else if (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'AssignmentExpression' && stmt.expression.right === concatCallNode) {
          stmt.expression.right = finalNode;
        }
        else if (stmt.type === 'ExpressionStatement' && stmt.expression === concatCallNode) {
          stmt.expression = finalNode;
        }
        else {
          ASSERT(false, 'normalized code?', stmt.type, stmt.expression?.type);
        }

        after(read.blockBody[read.blockIndex]);
        updated += 1;
        return;
      }
    }
  }


  return updated;
}
