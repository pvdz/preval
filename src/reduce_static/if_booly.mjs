// Find variables initialized to boolean which are set to a boolean in one if-branch. Some variation of:
//
//      let x = true; if (y) x = false;
// ->
//      let x = !y;
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifBooly(fdata) {
  group('\n\n\n[ifBooly] Checking for bool bindings that conditionally get mutated');
  const ast = fdata.tenkoOutput.ast;
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _ifBooly(fdata);
  groupEnd();
  return r;
}
function _ifBooly(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {

    // Find bindings with mustBeType=boolean
    // Check if they conform to the pattern `if (x) b = true` where the other branch doesn't mutate them or updates them to the opposite bool
    // See tests/_tofix/if_is_boolean.md for two examples

    if (meta.isImplicitGlobal || meta.isBuiltin) return;
    if (meta.typings.mustBeType !== 'boolean') return;
    if (meta.varDeclRef?.varDeclBody?.kind !== 'let') return; // I guess easiest way to tell if it's a let decl?

    // We should have a bool let decl.
    // Check if there's a literal write inside an if-branch
    meta.writes.every(write => {
      if (write.kind !== 'assign') return;
      if (write.grandNode.type === 'IfStatement') {
        if (AST.isBoolean(write.parentNode.right)) {
          // Ok this is assigning a bool to the binding in an if-branch...
          // Let's start with the easy case; an otherwise empty if
          const ifNode = write.grandNode;
          if (ifNode.consequent.body.body.length + ifNode.alternate.body.body.length === 1) {
            // This is the only statement inside the if. This is the easiest pattern.

          }
        }
      }
    });


  });

  if (changed) {
    log('Bool bindings updated:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'ifBooly', changes: changed, next: 'phase1'};
  }

  log('Bool bindings updated: 0.');
}
