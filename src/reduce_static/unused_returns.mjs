// Find functions with a common return value that is primitive and replace all call sites with that value

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

export function dropUnusedReturns(fdata) {
  group('\n\n\nChecking for functions that should return undefined but dont yet');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _dropUnusedReturns(fdata);
  groupEnd();
  return r;
}
function _dropUnusedReturns(fdata) {
  // phase1 will already determine the common primitive return value for each function
  // All we have to do here is find all calls to functions that still have a commonReturn set and inline those.

  let changed = 0;
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;

    const funcNode = meta.constValueRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    vgroup('- `' + meta.uniqueName + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    if (funcNode.$p.commonReturn?.type === 'Identifier' && funcNode.$p.commonReturn.name === 'undefined') {
      vlog('  - This function already returns undefined in all places.');
      vgroupEnd();
      return;
    }

    if (
      meta.reads.some(
        (read) =>
          read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee' || read.grandNode.type !== 'ExpressionStatement',
      )
    ) {
      vlog('  - There was a read that was not a call or where the return value was unused. Bailing');
      vgroupEnd();
      return;
    }

    // All usages of this function are calls and its return value is ignored (because the calls are statements)
    // Get all the return statements in this function and replace the argument to `undefined`
    funcNode.$p.returnNodes.forEach((rnode) => {
      if (rnode.argument.type !== 'Identifier' || rnode.argument.name !== 'undefined') {
        rule('If a function return value is never used all its return statements should return undefined');
        example('function f(){ return 15; } f();', 'function f(){ return undefined; } f();');
        before(rnode, funcNode);

        rnode.argument = AST.identifier('undefined');

        ++changed;
        after(rnode, funcNode);
      }
    });

    vgroupEnd();
  });

  if (changed) {
    log('Changed return values:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'dropUnusedReturns', changes: changed, next: 'phase1'};
  }
  log('Changed return values: 0');
}
