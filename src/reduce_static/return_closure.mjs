// Functions that return closures may outline that return value in their callers

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

export function returnClosure(fdata) {
  group('\n\n\n[returnClosure] Checking for functions that return a closure');
  //currentState(fdata, 'returnClosure'. true);
  const r = _returnClosure(fdata);
  groupEnd();
  return r;
}
function _returnClosure(fdata) {
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
    const returnMeta = fdata.globallyUniqueNamingRegistry.get(returnedName);
    ASSERT(returnMeta);

    // For the time being we only track calls to functions that are referenced directly.
    // If a function can reach a closure, and a call can reach a function, then by
    // transitivity, the call must be able to reach the closure. So we should be able
    // to outline the closure. This simplifies things a little bit, opening the door
    // to more optimizations (closures prevent a few things).

    const retVarDecl = returnMeta.writes.find((write) => write.kind === 'var');
    ASSERT(returnMeta.isBuiltin || returnMeta.isImplicitGlobal || retVarDecl, 'remind me, when was this possible? globals?');

    // TODO: fix the global cases
    vlog('Returns ident: `' + returnedName + '`. Block chains:', retVarDecl?.blockChain, 'and', funcNode.body.$p.blockChain);
    if (!retVarDecl) {
      vlog('The returned ident was not a var. Bailing');
      vgroupEnd();
      return;
    }
    if (!retVarDecl || retVarDecl.blockChain.startsWith(funcNode.body.$p.blockChain)) {
      vlog('The returned ident was not a closure. Bailing');
      vgroupEnd();
      return;
    }

    vlog('Function passes. Replacing all calls with the closure `' + returnedName + '`');
    meta.reads.forEach((read, ri) => {
      vlog('-', ri, read.action + ':' + read.kind);
      const callNode = read.parentNode;
      if (callNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
        vlog('  - Read is not a call so bailing');
        return;
      }

      if (read.blockBody[read.blockIndex].type === 'ExpressionStatement') {
        vlog("  - The call is a statement so the return value is ignored so we don't do anything here.");
        return;
      }

      vlog('  - Adding to queue for replacement');
      source(read.blockBody[read.blockIndex]);
      queue.push([
        callNode.$p.pid,
        () => {
          vlog('Should be able to replace the call with the closure and move the call before the original call now...');

          rule('If a function always returns a certain closure, the closure can be outlined');
          example(
            'function f() { let x = 1; function g(){ return ++x; } h(g()); }',
            'function f() { let x = 1; function g(){ ++x; } g(); h(x); }',
          );
          before(read.blockBody[read.blockIndex], funcNode);

          if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(returnedName);
          else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(returnedName);
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

    log('Closures outlined:', queue.length, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'returnClosure', changes: queue.length, next: 'phase1'};
  }

  log('Closures outlined: 0');
}
