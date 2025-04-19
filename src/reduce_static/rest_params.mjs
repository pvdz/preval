// A param that is a spread but never receives arguments should be local empty array
// `function f(...rest) {}`
// -> `function f(){ let rest = []; }`

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

export function restParams(fdata) {
  group('\n\n\n[restParams] Finding unused rest params');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _restParams(fdata);
  groupEnd();
  return r;
}
function _restParams(fdata) {
  let changed = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;

    const funcNode = meta.varDeclRef.node;
    if (funcNode.type !== 'FunctionExpression') return;

    // Note: only the last param may be a rest
    const last = funcNode.params[funcNode.params.length - 1];
    if (!last?.rest) return;

    vgroup('- `' + meta.uniqueName + '` has a rest param');

    process(meta, name, funcNode, last, funcNode.params.length - 1);

    vgroupEnd();
  });

  function process(meta, name, funcNode, pnode, pi) {
    if (!pnode.$p.paramVarDeclRef) {
      // This param is unused so we can change it into a regular (non-rest) param
      rule('When a rest param is unused it can become a regular param');
      example('function f(a, b, ...c) { g(a, b); } f(1, 2, 3, 4);', 'function f(a, b, c) { g(a, b); } f(1, 2, 3, 4);');
      before(funcNode);

      pnode.rest = false; // It can be that simple :)

      after(funcNode);
      ++changed;
      return;
    }

    if (meta.reads.some((read) => read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee')) {
      vlog('- Function escapes. Bailing');
      return;
    }

    if (
      meta.reads.some(
        (read) => read.parentNode['arguments'].length > pi || read.parentNode['arguments'].some((enode) => enode.type === 'SpreadElement'),
      )
    ) {
      vlog('- At least one call passed on arguments to this rest or used a spread which may do so. Bailing');
      return;
    }

    // The function looks something like this:
    // `function f(...Param) { let rest = Param; debugger; ... }`
    // And it should become something like
    // `function f(...Param) { debugger; let rest = []; ... }`

    // If this param is unused we can change it to a regular ident safely. Other rules will deal with that result.

    // Since there can only be one rest param per function, each function body can only have one mutation in this step.
    // That's why I don't think we need to queue these.

    rule('A rest param that cannot receive an arg should be a local empty array');
    example('function f(...rest) {} f();', 'function f(...tmp) { let rest = []; } f();');
    before(funcNode);

    // Move the var decl past the function boundary. Set its init to an empty array expression.
    const varNode = pnode.$p.paramVarDeclRef.blockBody[pnode.$p.paramVarDeclRef.blockIndex];
    funcNode.body.body.splice(funcNode.$p.bodyOffset, 0, varNode);
    varNode.init = AST.arrayExpression([]);
    funcNode.body.body[pnode.$p.paramVarDeclRef.blockIndex] = AST.emptyStatement();

    after(funcNode);
    ++changed;
  }

  if (changed) {
    log('Rest params changed:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'restParams', changes: changed, next: 'phase1'};
  }

  log('Rest params changed: 0');
}
