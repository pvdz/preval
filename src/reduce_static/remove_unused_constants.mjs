// Remove unused constant declarations when they are only used once and assigned to another variable.
//
//     const x = f(); y = x;
// ->
//     y = f();
//
//     const x = f(); let z = x;
// ->
//     let z = f();
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { isArgumentsLength } from '../ast.mjs';

export function removeUnusedConstants(fdata) {
  group('\n\n\n[removeUnusedConstants] Eliminating unused constants\n');
  let queue = [];
  let queue2 = [];
  //currentState(fdata, 'removeUnusedConstants', true, fdata);
  const changes = _inlineConstants(fdata, queue, queue2);

  if (changes) {
    vgroup('Running callbacks from first queue...');
    queue.sort(({ index: a }, { index: b }) => a - b); // ascending! most of the time we do back to front but this time i want first to last
    queue.forEach(({ func }) => func());
    vgroupEnd();
    vgroup('Running callbacks from second queue...');
    queue2.sort(({ index: a }, { index: b }) => b - a);
    queue2.forEach(({ func }) => func());
    vgroupEnd();
  }

  groupEnd();

  if (changes) {
    log('Unused constants eliminated:', changes, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'removeUnusedConstants', changes: changes, next: 'phase1'};
  }

  log('Unused constants eliminated:', changes, '.');
}
function _inlineConstants(fdata, queue, queue2) {
  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.writes[0].kind !== 'var') return;

    // Actually unused
    if (meta.reads.length === 0 && meta.writes.length === 1) {
      vlog('- name:', name, ', reads:', meta.reads.length, ', writes:', meta.writes.length, '; queued for elimination');
      // Put elimination or folding into the second queue.
      queue2.push({
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
      (
        (meta.reads[0].parentNode.type === 'AssignmentExpression' && meta.reads[0].parentProp === 'right') ||
        (meta.reads[0].parentNode.type === 'VarStatement' && meta.reads[0].parentProp === 'init')
      )
    ) {
      const write = meta.writes[0];
      const read = meta.reads[0];

      // This is a back to back const var stmt and then read.
      // The var is then assigned to another var or prop.
      // For now, focus on the ident case...
      const targetNode = read.parentNode.type === 'AssignmentExpression' ? read.parentNode.left : read.parentNode.id;
      if (targetNode.type === 'Identifier') {
        vlog('- name:', name, ', reads:', meta.reads.length, ', writes:', meta.writes.length, '; queued for elimination');
        queue.push({
          index: write.blockIndex, // Presumably this occurs later.
          func: () => {
            rule('A one-time-use const that is immediately assigned can be cleaned up');
            example('const x = y; z = x;', 'z = y;');
            example('const x = y; let z = x;', 'let z = y;');
            before(write.blockBody[write.blockIndex]);
            before(read.blockBody[read.blockIndex]);

            if (read.parentNode.type === 'AssignmentExpression') {
              read.parentNode.right = write.parentNode.init;
            } else {
              read.parentNode.init = write.parentNode.init;
            }

            // Postpone actual elimination to after this queue
            queue2.push({
              index: write.blockIndex,
              func: () => {
                write.blockBody.splice(write.blockIndex, 1);
              }
            });

            after(AST.emptyStatement());
            after(read.blockBody[read.blockIndex]); // Note: this is read index now so s'fine
          }
        });
        ++changes;
        return;
      }
    }

  });

  return changes;
}
