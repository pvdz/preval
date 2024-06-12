// Inline constants where values permit it

import { ARG_THIS_ALIAS_PREFIX } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function writeOnly(fdata) {
  group('\n\n\nEliminating bindings that are only written to\n');
  const r = _writeOnly(fdata);
  groupEnd();
  return r;
}
function _writeOnly(fdata) {
  /** @var {Array<{pid: number, func: () => void}>} */
  const queue = [];
  let changes = 0;

  // Note: This step may rename bindings, eliminate them (queued), introduce new ones.
  //       Take care to preserve body[index] ordering. Don't add/remove elements to any body array.
  //       Preserve the parent of any identifier as detaching them may affect future steps.
  //       If any such parent/ancestor is to be removed, put it in the toEliminate queue.
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    // Ignore the `this` and `arguments` aliases
    if (!name.startsWith(ARG_THIS_ALIAS_PREFIX)) return;
    if (meta.reads.length > 0) return; // Has reads. Not this trick.
    if (meta.writes[0].kind !== 'var') return; // First write is not the var decl. We can't guarantee TDZ safety. Bailing. TODO: Maybe we don't need to?
    vgroup('-- name: `' + name + '`, has no reads and', meta.writes.length, 'writes');

    ASSERT(meta.writes.length, 'must have writes', meta);
    // For now, only eliminate actual var decls and assigns. Catch clause is possible. Can't change params for now.

    for (let i = meta.writes.length - 1; i >= 0; --i) {
      const write = meta.writes[i];
      // Other rules can deal with the const decl and we have to ignore other kinds of writes here (catch, params, etc)
      if (write.kind === 'assign') {
        queue.push({
          pid: +write.node.pid,
          func: () => {
            rule('Assignment ref of write-only binding should be eliminated');
            example('const x = 1; x = 2;', 'const x = 1; x; 2;');
            before(write.blockBody[write.blockIndex]);

            // Create expression statements for both sides. This is necessary to preserve potential TDZ errors.
            // We'll eliminate these if we can assert TDZ can't happen, or for any non-binding idents / values.
            write.blockBody[write.blockIndex] = AST.blockStatement(
              AST.expressionStatement(write.parentNode.right), // RHS first because that's evaluated first in an assignment.
              AST.expressionStatement(write.parentNode.left),
            );

            after(write.blockBody[write.blockIndex]);
          },
        });

        ++changes;
      }
    }

    vgroupEnd();
  });

  if (queue.length) {
    queue.sort(({pid: a}, {pid: b}) => b-a); // Process back to front, AST node order
    queue.forEach(({func}) => func());

    log('Write only bindings eliminated:', changes, '. Restarting from phase1');
    return true; // normalize
  }
  log('Write only bindings eliminated:', changes);
}
