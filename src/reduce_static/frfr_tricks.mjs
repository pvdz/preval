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
  findBodyOffset, todo, findBodyOffsetExpensiveMaybe, assertNoDupeNodes,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';

export function frfrTricks(fdata) {
  group('\n\n\n[frfrTricks] Searching $frfr calls to optimize\n');
  const changed = _frfr_tricks(fdata);
  groupEnd();

  if (changed) {
    log('$frfrs optimized:', changed, '. Restarting from phase1');
    return {what: 'frfr_tricks', changes: changed, next: 'phase1'};
  }

  log('$frfrs optimized: 0.');
}
function _frfr_tricks(fdata) {
  let changed = 0;

  const meta = fdata.globallyUniqueNamingRegistry.get('$frfr');
  if (!meta) return 0; // May not be used at all.

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
    source(read.blockBody[read.blockIndex], true)
    ASSERT(freeFuncMeta?.varDeclRef?.node.id?.name === '$free', 'this is our DSL and the func it calls should be a $free func or what is going on?', freeFuncMeta?.varDeclRef, freeFuncName);
    const freeFuncNode = freeFuncMeta.varDeclRef.node;


    if (freeFuncNode.params.length === 0) {
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
              freeFuncNode.params[j].$p.paramVarDeclRef.node.name = '$$' + j;
              freeFuncNode.params[j].$p.paramVarDeclRef.node.index = j;
            }

            after(freeFuncMeta.writes[0].blockBody[freeFuncMeta.writes[0].blockIndex]);
            after(read.blockBody[read.blockIndex]);
            changed += 1;
            assertNoDupeNodes(freeFuncNode, 'body');
          }
        }
      } else {
        todo('maybe we can inline a primitive into a frfr that is called multiple times, too?');
      }
    }
    if (args.length-1 !== freeFuncNode.params.length) {
      todo('frfr and free arg mismatch');
    }
  });

  return changed;
}
