// Remove unused constant declarations

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { isArgumentsLength } from '../ast.mjs';

export function removeUnusedConstants(fdata) {
  group('\n\n\nEliminating unused constants\n');
  const changes = _inlineConstants(fdata);
  groupEnd();

  if (changes) {
    log('Unused constants eliminated:', changes, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'removeUnusedConstants', changes: changes, next: 'normal'};
  }

  log('Unused constants eliminated:', changes, '.');
}
function _inlineConstants(fdata) {
  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.reads.length > 0 || meta.writes.length > 1) return;
    if (meta.writes[0].kind !== 'var') return;

    rule('A constant that has no refs can be eliminated');
    example('const x = f();', 'f();');
    before(meta.writes[0].blockBody[meta.writes[0].blockIndex]);

    const init = meta.writes[0].blockBody[meta.writes[0].blockIndex].declarations[0].init;
    meta.writes[0].blockBody[meta.writes[0].blockIndex] =
      (
        AST.isPrimitive(init) || // Don't leave primitives as statements
        init.type === 'Param' || // Don't leave special Param nodes as statements
        init.type === 'FunctionExpression' || // Don't leave function expressions as statement (without assign and not as decl)
        (init.type === 'Identifier' && init.name === 'arguments') || // Dont bother leaving `arguments` as statement
        isArgumentsLength(init) || // Dont bother leaving `arguments.length` as statement
        init.type === 'ThisExpression' // Don't leave `this` as statement
      )
        ? AST.emptyStatement()
        : AST.expressionStatement(init);

    after(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
    ++changes;
  });

  return changes;
}
