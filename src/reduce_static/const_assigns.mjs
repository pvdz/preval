// Detect assignments to constant bindings and add an explicit throw immediately after them.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function constAssigns(fdata) {
  group('\n\n\nChecking assignments to bindings that are const\n');
  const r = _constAssigns(fdata);
  groupEnd();
  return r;
}
function _constAssigns(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let found = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    //if (meta.isConstant) return; // let or const is irrelevant
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.writes.length === 1) return;
    if (found) return;
    if (meta.varDeclRef.varDeclNode.type !== 'VarStatement') return; // catch, for-x, ???

    vgroup('- `' + name + '`: is a const var with', meta.writes.length, 'writes');
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    // Flat-out compile a throw after each write to this binding. There's nothing else to it.

    meta.writes.forEach((write) => {
      if (write.parentNode.type === 'VarStatement' && write.parentProp === 'id') return; // This is the var decl. Skip that one.

      rule('Writes to a const binding must throw');
      example('const x = 5; x = 10; f();', 'const x = 5; x = 10; throw error; f();');
      before(write.blockBody[write.blockIndex]);

      // I want to eliminate the assignment because it must be a crashing branch of code that is probably never executed and
      // it should not hold back optimizations otherwise just because it is a constant with multiple writes or whatever.
      write.blockBody[write.blockIndex] = AST.throwStatement(AST.templateLiteral('Preval: Cannot write to const binding `' + name + '`'));

      after(write.blockBody[write.blockIndex]);
      // This will shortcut this step and request another normalization step. This is necessary because other
      // references may be stale now and dead code is probably introduced for all the code after the new `throw`.
      // It's fine since this should be a very rare occurrence in real world code as it's a very hard error.
      ++found;
    });
  }

  if (found) {
    log('Found const write errors:', found, '. Restarting from from normalization to eliminate dead code.');
    return {what: 'constAssigns', changes: found, next: 'normal'}; // Need to potentially eliminate dead code (!)
  }

  log('Found const write errors:: 0.');
}
