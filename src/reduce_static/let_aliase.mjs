// Search for two constant assignments that are assigned the same let value
// `let x = $; const a = x; const b = x; $(a, b)`
// -> `let x = $; const a = x; $(a, a)`
//
// We need to find back-to-back reads of a let, confirm they are assigning
// to a constant decl, confirm they are in the same loop/catch scope,
// and then confirm there are no observable side effects between the writes.
//
// Don't expect this to be a very common case. But we can at least scan for
// it relatively quickly due to the requirements of writing a let binding to
// two const bindings, back to back, same scope and everything.

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
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {hasObservableSideEffectsBetweenRefs} from "../ast.mjs"

export function letAliasing(fdata) {
  group('\n\n\nSearching for back-to-back writes of a let binding to a const binding\n');
  const r = _letAliasing(fdata);
  groupEnd();
  return r;
}
function _letAliasing(fdata) {
  let changed = 0;
  let matches = [];
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    //console.log(meta)
    if (meta.isConstant) return; // Targeting lets only

    // Find back-to-back write, both init to a const decl

    vlog(`- Testing ${name}`);

    let prevRead;
    meta.rwOrder.forEach((rw, i) => {
      if (rw.action !== 'read') {
        prevRead = undefined;
        return;
      }
      if (!prevRead) {
        prevRead = rw;
        return;
      }
      vlog('   - Found two reads');

      if (prevRead.parentNode.type !== 'VariableDeclarator') {
        vlog('     - bail: prev is not const decl:', prevRead.parentNode.type);
        prevRead = rw;
        return;
      }

      if (rw.parentNode.type !== 'VariableDeclarator') {
        vlog('     - bail: next is not const decl:', rw.parentNode.type);
        prevRead = undefined;
        return;
      }

      vgroup(`    - Found a back to back read to consts (${prevRead.parentNode.id.name} = ${prevRead.parentNode.init.name}, ${rw.parentNode.id.name} = ${prevRead.parentNode.init.name}). Now checking observability.`);

      if (rw.innerLoop !== prevRead.innerLoop) {
        vlog(`      - Reads were not in same loop, bailing`);
        prevRead = rw;
        return;
      }

      if (rw.innerIf !== prevRead.innerIf) {
        vlog(`      - Reads were not in same if-branch, bailing`);
        prevRead = rw;
        return;
      }

      if (rw.innerElse !== prevRead.innerElse) {
        vlog(`      - Reads were not in same else-branch, bailing`);
        prevRead = rw;
        return;
      }

      if (rw.innerCatch !== prevRead.innerCatch) {
        vlog(`      - Reads were not in same catch, bailing`);
        prevRead = rw;
        return;
      }

      // The writes are back-to-back and same scope and of a let to a const.
      // Now need to confirm that the two nodes do not have observable side effects between them.

      //const ast = fdata.tenkoOutput.ast;
      //vlog('about to check it for this code:');
      //source(ast, true);

      const MAY_MISS = true; // The reads could be nested in different scopes. This search would miss in that case.
      if (hasObservableSideEffectsBetweenRefs(prevRead, rw, MAY_MISS, `${prevRead.parentNode.id.name} = ${prevRead.parentNode.init.name}, ${rw.parentNode.id.name} = ${prevRead.parentNode.init.name}`)) {
        prevRead = rw;
        vlog('      - bail, hasObservableSideEffectsBetweenRefs, unsafe')
        return;
      }
      vgroupEnd();

      vlog('Confirmed that', rw.parentNode.id.name, 'is an alias to', prevRead.parentNode.id.name, 'because they are assigned the same value with no observable side effects in between');
      matches.push([prevRead, rw]);
    });
  });

  vlog('Found the following aliases:', matches);

  matches.sort(([,a], [,b]) => b.node.$p.pid - a.node.$p.pid).forEach(([ra, rb]) => {
    const oldName = rb.parentNode.id.name;
    const newName = ra.parentNode.id.name;
    ASSERT(oldName && newName, 'should have two names now', oldName, newName);
    const meta = fdata.globallyUniqueNamingRegistry.get(oldName);
    if (!meta) {
      // This one was already replaced in this loop so skip it now.
      vlog('Skipping', oldName, 'to', newName, 'because', oldName, 'was already updated in this call...');
      return;
    }
    vlog(`- Combining \`${oldName}\` with \`${newName}\``);
    rule('Assignment of same let value to two different constants should consider those an alias');
    example('let x = $; const a = x; const b = x; $(a, b);', 'let x = $; const a = $; ; $(a, a)');
    before(ra.blockBody[ra.blockIndex]);
    before(rb.blockBody[rb.blockIndex]);

    // - convert the second constant into an assignment
    // - rename all references

    // We know both refs are reads of an ident as the init of a var decl. Replace the var decl with an assignment.
    rb.blockBody[rb.blockIndex] = AST.emptyStatement();
    // Replace the name in all its refs
    meta.rwOrder.forEach(rw => rw.node.name = newName);
    fdata.globallyUniqueNamingRegistry.delete(oldName);

    after(ra.blockBody[ra.blockIndex]);
    after(rb.blockBody[rb.blockIndex]);
    ++changed;
  });

  if (changed) {
    log('Lets aliased:', changed, '. Restarting from phase1');
    return 'phase1';
  }

  log('Lets aliased: 0.');
}
