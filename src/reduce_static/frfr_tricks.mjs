// Search for $frfr calls to optimize
//
//    $frfr(x, a, 1, b)
// ->
//    $frfr(x, a, b)
//
// Should be able to optimize the func and propagate the 1 inside of it. Worst case, split it? But that's not my pref.
//
// Also, back to back $frfr can be merged into one
//
//    $frfr(x); $frfr(y)
// ->
//    $frfr(x, y)
//
//
// If a $frfr is called with primitive args, the free func is cloned and the primitive is inlined for that call.
// The idea is that other reducers will inline that value and are then more likely to resolve the free func.
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, todo, findBodyOffsetExpensiveMaybe, assertNoDupeNodes, currentState, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, mayBindingMutateBetweenRefs } from '../bindings.mjs';
import { SYMBOL_FRFR } from '../symbols_preval.mjs';

export function frfrTricks(fdata) {
  group('\n\n\n[frfrTricks] Searching $frfr calls to optimize\n');
  // currentState(fdata, 'frfrTricks', true, fdata);
  const changed = _frfr_tricks(fdata);
  groupEnd();
  return changed;
}
function _frfr_tricks(fdata) {
  let changed = 0;
  let queue = [];

  const meta = fdata.globallyUniqueNamingRegistry.get(SYMBOL_FRFR);
  if (!meta) return; // It may not be used. It's not registered as a builtin.

  meta.reads.forEach(read => {
    // Cases to look out for:
    // - A $frfr without any args should be a resolved case, except perhaps rounding error cases
    // - A $frfr call with any primitive arg
    // - A back-to-back $frfr call
    // - A $frfr call with free statements before/after (tricky when they assign to different bindings unless the second uses the first maybe)
    // - A frfr with different amount of args than the $free func it calls

    const call = read.parentNode;
    ASSERT(call.type === 'CallExpression', 'frfr is ours so this should be predictable', call);
    const args = call.arguments;
    ASSERT(args.length >= 1 && args[0].type === 'Identifier', 'First arg must be the free func being called', args);
    const freeFuncName = args[0].name;
    const freeFuncMeta = fdata.globallyUniqueNamingRegistry.get(freeFuncName);
    ASSERT(freeFuncMeta?.varDeclRef?.node.id?.name === '$free', 'this is our DSL and the func it calls should be a $free func or what is going on?', freeFuncMeta?.varDeclRef, freeFuncName);
    const freeFuncNode = freeFuncMeta.varDeclRef.node;


    if (freeFuncNode.params.length === 0) {
      // I think, in theory, the function should resolve itself to the point where other reducers inline it...?
      todo('free with zero args, we can eliminate this?');
    }
    if (args.some((anode,i) => i !== 0 && AST.isPrimitive(anode))) {
      if (freeFuncMeta.reads.length === 1) {
        for (let argIndex=args.length-1; argIndex>0; --argIndex) {
          const paramIndex = argIndex-1; // Remember: first arg to $frfr is the func itself
          if (AST.isPrimitive(args[argIndex])) {
            rule('A $free function that is used once and called with a primitive can have that primitive inlined');
            example(' const f = function $free(x){ return x; }; $frfr(f, 100);', 'const f = function $free(){ return 100; } $frfr(f);');
            before(freeFuncMeta.writes[0].blockBody[freeFuncMeta.writes[0].blockIndex]);
            before(read.blockBody[read.blockIndex]);

            const arg = args.splice(argIndex, 1)[0];
            const param = freeFuncNode.params.splice(paramIndex, 1)[0];
            //vlog('Param at index:', argIndex, param)
            if (param.$p.paramVarDeclRef) {
              const block = param.$p.paramVarDeclRef.blockBody;
              const index = param.$p.paramVarDeclRef.blockIndex;
              const decl = block[index];
              vlog('The decl to move:', decl);
              block[index] = AST.emptyStatement(); // placeholder to keep the boundary at the same place
              block.splice(findBodyOffsetExpensiveMaybe(block), 0, decl);
              decl.init = arg;
            }

            // Have to update the name of the parameters that follow.
            for (let j=paramIndex; j<freeFuncNode.params.length; ++j) {
              freeFuncNode.params[j].name = '$$' + j;
              freeFuncNode.params[j].index = j;
              if (freeFuncNode.params[j].$p.paramVarDeclRef) {
                freeFuncNode.params[j].$p.paramVarDeclRef.node.name = '$$' + j;
                freeFuncNode.params[j].$p.paramVarDeclRef.node.index = j;
              }
            }

            after(freeFuncMeta.writes[0].blockBody[freeFuncMeta.writes[0].blockIndex]);
            after(read.blockBody[read.blockIndex]);
            changed += 1;
            assertNoDupeNodes(freeFuncNode, 'body');
          }
        }
      } else {
        vlog('- Have a frfr with at least one primitive arg. Going to create a clone of the free function with those params inlined');

        // free functions should not reference arguments or this, but bail if they do anyways
        if (freeFuncNode.$p.readsArgumentsAny || freeFuncNode.$p.thisAccess) {
          vlog('- not cloning function, it uses `arguments` or `this`');
        } else {
          // We clone the free function into a new free function, inline the params for which we have a primitive, then run back to normalization
          // While this has a small risk of code explosion, the primitive should get resolved quickly and simplify that
          // function immediately. Even in the case of a 20k string being called, it only gets unrolled a few times. I expect
          // it will be ok. Hope that I'm right.

          vlog('- Going to clone the free function, inline the params for which we have primitives, make the original frfr call the clone');

          const actualArgs = call.arguments.slice(1); // frfr first arg is the free func, rest is actual args

          // frfr's don't contain nested functions. the clone would fail if something wanted to assign to an ident but
          // I think free functions tend not to do this anyways. If it fails it fails, that's ok.
          // I don't think free funcs await/yield, but we'll reject on that either way just in case.

          // Note: we dont pass in new params so we should collect all refs and none should be renamed, yet.
          const declsFound = []; // Contains the _cloned_ var statement nodes of all explicit let/const that were cloned. Should be safe to rename.
          const refsFound = []; // Contains the _cloned_ ident nodes (!) for each reference that was cloned. Should be safe to rename. Excludes decl id.
          const fail = {};
          const slicedBody = AST.blockStatement(freeFuncNode.body.body.slice(freeFuncNode.$p.bodyOffset));
          const clone = AST.deepCloneForFuncInlining(slicedBody, new Map, fail, false, declsFound, refsFound);
          if (fail.ed) {
            vlog('  - bail: func cloning failed on this free function, kind of unexpected but here we are', fail);
            return;
          }

          vlog('- Ok, we have cloned the function body... found', declsFound.length, 'decls and', refsFound.length, 'refs');

          rule('A frfr with primitives should clone the free function with the primitive args inlined');
          example('const f = function $free(x,y,z) { $(x, y, z); }; $frfr(f, a, 1, b);', 'const f2 = function $free(x,z) { y = 1; $(x, y, z); }; $frfr(f2, a, b);')
          before(read.blockBody[read.blockIndex]);

          // Result should be a Block without header. Next: Rename all params and local vars.

          // Note: must splat the param names to get rid of elided holes
          const newParamNames = new Map([...freeFuncNode.$p.paramNames].map(name => {
            if (!name) return ['', '']; // map will create one key, regardless
            const newName = createFreshVar(name, fdata);
            return [name, newName];
          }));
          vlog('New param names:', newParamNames);

          const newDeclNames = new Map(declsFound.map(node => {
            const oldName = node.id.name;
            const newName = createFreshVar(oldName, fdata)
            node.id.name = newName;
            return [oldName, newName];
          }));
          vlog('New decl names:', newDeclNames);

          // Should now go through the refs and rename them if they appear in either map

          vgroup('- Applying new names...');
          refsFound.forEach(node => {
            if (node.type === 'VarStatement') {
              // var decl
              const newParamName = newDeclNames.get(node.name) || newParamNames.get(node.id.name);
              if (newParamName) {
                vlog('- renamed param', node.id.name, 'to', newParamName);
                node.id.name = newParamName;
              }
            }
            else if (node.type === 'Identifier') {
              const newRefName = newDeclNames.get(node.name) || newParamNames.get(node.name);
              if (newRefName) {
                vlog('- renamed ref', node.name, 'to', newRefName);
                node.name = newRefName;
              }
            }
            else ASSERT(false, 'unreachable');
          });
          vgroupEnd();

          // Create header

          const newParamsNames = []; // string[]
          const dropped = []; // true/false for each original position
          const header = [];
          vgroup('- Creating new param list, old:', freeFuncNode.params);
          for (let pi=0; pi<freeFuncNode.$p.paramNames.length; ++pi) { // Loop because forEach would not visit holes, leaving trailing params
            const pname = freeFuncNode.$p.paramNames[pi];
            vgroup('-', pname);
            if (!pname) {
              // Param exists but is not used.
              // Since we are creating a fresh function, we can be certain it's not used elsewhere, so we can prune
              // the param now...
              vlog('Pruning param', pi);
              dropped[pi] = true;
            }
            else {
              if (!actualArgs[pi]) {
                // In this case the argument ends up as undefined. Not sure if I'm really expecting this with a free func tbh.
                todo('Am I expecting arg underflow for free funcs?');
                vlog('- keeping as is');
                dropped[pi] = false;
              }
              else if (AST.isPrimitive(actualArgs[pi])) {
                header.push(AST.varStatement('let', newParamNames.get(pname), AST.cloneSimple(actualArgs[pi])));
                dropped[pi] = true;
                vlog('- inlined as arg', pi);
              }
              else {
                newParamsNames.push(newParamNames.get(pname));
                dropped[pi] = false;
                vlog('- kept, as', newParamNames.get(pname));
              }
            }
            vgroupEnd();
          }
          vgroupEnd();

          // Prepend the primitive inits
          const clonedBodyArr = header.concat(clone.body);

          // Now we have a list of param names and a body. Construct the function?

          const clonedFuncNode = AST.functionExpressionNormalized(newParamsNames, clonedBodyArr, { id: '$free' });
          clonedFuncNode.$p.paramNames = newParamsNames;

          const newFreeName = createFreshVar(freeFuncName, fdata);
          const newDecl = AST.varStatement('const', newFreeName, clonedFuncNode);

          vlog('Original:');
          source(freeFuncMeta.varDeclRef.varDeclNode, true);
          vlog('Clone:');
          source(newDecl, true);

          // We inject that from a queue afterwards. Now update the caller with the new name and prune the primitive args.
          read.parentNode.arguments[0] = AST.identifier(newFreeName);
          vlog('- Now drop the args from the original call for which the params were dropped:', dropped);
          // Note: arguments is offset 1 because first arg is free func ref.
          read.parentNode.arguments = read.parentNode.arguments.filter((anode,i) => i === 0 || !dropped[i-1]);
          vlog('call args:', read.parentNode.arguments.length, ', new params:', newParamsNames.length)
          if (read.parentNode.arguments.length > newParamsNames.length+1) {
            vlog('- Pruning args of call to match param length:', read.parentNode.arguments.length-1, newParamsNames.length);
            read.parentNode.arguments.length = newParamsNames.length + 1; // frfr first arg is free func ref
          }

          queue.push({index: 0, func: () => freeFuncMeta.varDeclRef.varDeclBody.unshift(newDecl)});

          after(read.blockBody[read.blockIndex]);
          changed = changed + 1;
        }
      }
    }
    if (args.length-1 !== freeFuncNode.params.length) {
      todo('frfr and free arg mismatch');
    }
  });

  if (changed) {
    queue.sort(({index: a}, {index: b}) => b-a);
    queue.forEach(({func}) => func());

    log('$frfrs optimized:', changed, '. Restarting from phase1');
    return {what: 'frfr_tricks', changes: changed, next: 'phase1'};
  }

  log('$frfrs optimized: 0.');
}
