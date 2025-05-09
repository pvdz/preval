// Remove unused constant declarations

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { isArgumentsLength } from '../ast.mjs';

export function removeUnusedConstants(fdata) {
  group('\n\n\n[removeUnusedConstants] Eliminating unused constants\n');
  let queue = [];
  //currentState(fdata, 'removeUnusedConstants'. true, fdata);
  const changes = _inlineConstants(fdata, queue);
  groupEnd();

  if (changes) {
    vgroup('Running callbacks in the loop now...');
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());
    vgroupEnd();

    log('Unused constants eliminated:', changes, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'removeUnusedConstants', changes: changes, next: 'phase1'};
  }

  log('Unused constants eliminated:', changes, '.');
}
function _inlineConstants(fdata, queue) {
  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.writes[0].kind !== 'var') return;

    // Actually unused
    if (meta.reads.length === 0 && meta.writes.length === 1) {
      vlog('- name:', name, ', reads:', meta.reads.length, ', writes:', meta.writes.length, '; queued for elimination');
      queue.push({
        index: meta.writes[0].blockIndex,
        func: () => {
          rule('A constant that has no refs can be eliminated');
          example('const x = f();', 'f();');
          before(meta.writes[0].blockBody[meta.writes[0].blockIndex]);

          const init = meta.writes[0].blockBody[meta.writes[0].blockIndex].init;
          if (
            AST.isPrimitive(init) || // Don't leave primitives as statements
            init.type === 'TemplateLiteral' || // Any expressions should be explicitly coerced to string, so this should be safe to drop
            init.type === 'Param' || // Don't leave special Param nodes as statements
            init.type === 'FunctionExpression' || // Don't leave function expressions as statement (without assign and not as decl)
            (init.type === 'Identifier' && init.name === 'arguments') || // Dont bother leaving `arguments` as statement
            isArgumentsLength(init) || // Dont bother leaving `arguments.length` as statement
            init.type === 'ThisExpression' // Don't leave `this` as statement
          ) {
            meta.writes[0].blockBody.splice(meta.writes[0].blockIndex, 1);
            after(AST.emptyStatement());
          } else {
            meta.writes[0].blockBody[meta.writes[0].blockIndex] = AST.expressionStatement(init);
            after(meta.writes[0].blockBody[meta.writes[0].blockIndex]);
          }
        }
      });
      ++changes;
      return;
    }

    // Used once. Find the `const x = y; z = x;` pattern and clean it up.
    if (
      meta.reads.length === 1 &&
      meta.writes.length === 1 &&
      meta.writes[0].blockBody === meta.reads[0].blockBody &&
      meta.writes[0].blockIndex + 1 === meta.reads[0].blockIndex &&
      meta.reads[0].parentNode.type === 'AssignmentExpression' &&
      meta.reads[0].parentProp === 'right'
    ) {
      const write = meta.writes[0];
      const read = meta.reads[0];

      // This is a back to back const var stmt and then read.
      // The var is then assigned to another var or prop.
      // For now, focus on the ident case...
      if (read.parentNode.left.type === 'Identifier') {
        queue.push({
          index: meta.writes[0].blockIndex,
          func: () => {
            rule('A one-time-use const that is immediately assigned can be cleaned up');
            example('const x = y; z = x;', 'z = y;');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            read.parentNode.right = write.parentNode.init;
            write.blockBody.splice(write.blockIndex, 1);

            after(AST.emptyStatement());
            after(write.blockBody[write.blockIndex]); // Note: this is read index now so s'fine
          }
        });
        ++changes;
        return;
      }
    }

  });

  return changes;
}
