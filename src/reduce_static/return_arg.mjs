// Functions that return their args should have their calls replaced with the arg, if they're a constant

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
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function returnArg(fdata) {
  group('\n\n\n[returnArg] Checking for functions that return an arg');
  //currentState(fdata, 'returnArg'. true);
  const r = _returnArg(fdata);
  groupEnd();
  return r;
}
function _returnArg(fdata) {
  let queue = [];
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;

    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vgroup('- `' + meta.uniqueName + '`');

    if (funcNode.$p.commonReturn === undefined) {
      vlog('I guess this function is always throwing and thats why it does not have any return value?');
      vgroupEnd();
      return;
    }

    if (funcNode.$p.commonReturn?.type !== 'Identifier') {
      vlog('  - Not returning an ident or returning more than one value, bailing');
      vgroupEnd();
      return;
    }

    const returnedName = funcNode.$p.commonReturn.name;

    const paramIndex = funcNode.$p.paramNames.indexOf(returnedName);
    if (paramIndex < 0) {
      vlog('  - The returned ident was not a param name');
      vgroupEnd();
      return;
    }

    if (funcNode.params.some((pnode, i) => i <= paramIndex && pnode.rest)) {
      vlog('The function had at least one rest parameter before the target param. Must bail');
      vgroupEnd();
      return;
    }

    const returnMeta = fdata.globallyUniqueNamingRegistry.get(returnedName);
    ASSERT(returnMeta);

    if (!returnMeta.isConstant) {
      vlog('  - The param was not a constant, bailing');
      vgroupEnd();
      return;
    }

    vlog('  - Returned value is a constant param. Replace all calls where this param is a constant value');

    meta.reads.forEach((read, ri) => {
      vlog('    -', ri, read.action + ':' + read.kind);
      const callNode = read.parentNode;
      if (callNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
        vlog('      - Read is not a call so bailing');
        return;
      }

      if (read.blockBody[read.blockIndex].type === 'ExpressionStatement') {
        // No need to remove the returned value. There is another rule that will clean up unused/unobserved returns.
        vlog("      - The call is a statement so the return value is ignored so we don't do anything here.");
        return;
      }

      const args = callNode['arguments'];

      if (args.some((anode, i) => i <= paramIndex && anode.type === 'SpreadElement')) {
        vlog('      - The call had a spread before the target arg, bailing');
        return;
      }

      // The call args must be simple. We must check here whether the arg was a non-constant ident. I think that is
      // the only case that we must bail on here.

      const arg = args[paramIndex];

      if (arg?.type === 'Identifier') {
        const argMeta = fdata.globallyUniqueNamingRegistry.get(arg.name);
        if (!argMeta.isConstant || argMeta.isImplicitGlobal) {
          vlog('      - The param was not a constant or an implicit global. Bailing');
          return;
        }
      }

      vlog('      - Adding to queue for replacement');
      source(read.blockBody[read.blockIndex]);
      queue.push([
        callNode.$p.pid,
        () => {
          vlog('Should be able to replace the call with the arg and move the call before the original call now...');

          rule('If a function always returns a certain arg, the arg can be outlined');
          example(
            'function f() { let x = 1; function g(){ return ++x; } h(g()); }',
            'function f() { let x = 1; function g(){ ++x; } g(); h(x); }',
          );
          before(read.blockBody[read.blockIndex], funcNode);

          const finalArgNode = arg ? AST.cloneSimple(arg) : AST.identifier('undefined');
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalArgNode;
          else read.grandNode[read.grandProp][read.grandIndex] = finalArgNode;
          read.blockBody.splice(read.blockIndex, 0, AST.expressionStatement(callNode));

          after(read.blockBody[read.blockIndex]);
          after(read.blockBody[read.blockIndex + 1]);
        },
      ]);
    });

    vgroupEnd();
  });

  if (queue.length) {
    vlog();
    vlog('Applying queue now...');
    vlog();

    // Now unwind the queue in reverse AST order. This way splices should not interfere with each other.
    queue.sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(([pid, f]) => {
      vgroup('-');
      f();
      vgroupEnd();
    });

    log('Args outlined:', queue.length, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'returnArg', changes: queue.length, next: 'phase1'};
  }

  log('Args outlined: 0');
}
