// Search for functions that only call themselves. For example, if they only
// refer to themselves inside their body then they are effectively dead code.
//
//      function f() { return f(1); }
//


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

export function recursiveFuncs(fdata) {
  group('\n\n\n[recursiveFuncs] Checking for recursive function decls stuffs');
  //currentState(fdata, 'recursiveFuncs', true, fdata);
  const r = _recursiveFuncs(fdata);
  groupEnd();
  return r;
}
function _recursiveFuncs(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let updated = processAttempt(fdata);

  if (updated) {
    log('Recursive functions eliminated:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'recursiveFuncs', changes: updated, next: 'phase1'};
  }
  log('Recursive functions eliminated: 0.');
}

function processAttempt(fdata, queue) {
  let updated = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;

    const funcs = [];
    if (!meta.writes.every(write => {
      if (write.parentNode.type === 'AssignmentExpression') {
        if (write.parentNode.right.type === 'FunctionExpression') {
          funcs.push(write.parentNode.right);
          return true;
        }
        return false;
      }
      if (write.parentNode.type === 'VarStatement') {
        if (write.parentNode.init.type === 'FunctionExpression') {
          funcs.push(write.parentNode.init);
          return true;
        }
        return false;
      }
      if (write.parentNode.type === 'CatchClause') {
        return false;
      }
      ASSERT(false, 'what else mutates a binding?', write.parentNode.type);
      return false;
    })) {
      // Not all assigns were a func expr
      return;
    }

    // All writes assigned a function expr. Check if all reads are inside any of those. If so this is all dead.

    vlog('Name:', name,' Have', funcs.length, '; checking if all of the', meta.reads.length, 'are inside any of the funcs');
    if (!meta.reads.every(read => {
      // Is this read the child of one of the assigned functions? In that case it's not
      // proof that the function is invoked anywhere from outside of the function itself.
      // Note: append comma to the funcChain to prevent `1,5 prefix of 1,53` -> `1,5, is not prefix of 1,53,`
      const chain = read.funcChain + ',';
      vlog('Checking if read @', read.node.$p.npid, 'with funcChain', chain);
      return funcs.some(funcNode => {
        vlog('- func funcChain:', funcNode.$p.funcChain);
        return read.funcChain.startsWith(funcNode.$p.funcChain + ',')
      });
    })) {
      // There was at least one read that was not inside the function assigned to this binding
      vlog('-- at least one read appears outside of itself, bail');
      return;
    }

    // Every read was inside a function assigned to this binding name so the function is dead code.
    meta.writes.forEach(write => {
      rule('If every read to a binding was inside a function assigned to that binding then the binding is dead code');
      example('const f = function() { f(); }', '');
      before(write.blockBody[write.blockIndex]);

      write.blockBody[write.blockIndex] = AST.emptyStatement();

      after(write.blockBody[write.blockIndex]);
      updated += 1;
    });
  });

  return updated;
}
