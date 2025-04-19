// Find bindings used as an if-test inside an if-test that's also testing for that binding. The nested binding is moot.
//
//    `const x = $(); if (x) { if (x) $(1); else $(2); } else $(3);`
// ->
//    `const x = $(); if (x) { $(1); } else $(3);`
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifTestNested(fdata) {
  group('\n\n\n[ifTestNested] Looking for bindings as nested if-test\n');
  const r = _ifTestNested(fdata);
  groupEnd();
  return r;
}
function _ifTestNested(fdata) {
  let changed = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return;
    if (meta.writes[0].parentNode.kind !== 'const') return;

    let targets = meta.reads.filter(read => read.parentNode.type === 'IfStatement');
    if (targets.length <= 1) {
      // Not used as if-test at least twice, can't be our target
      return;
    }

    vgroup('- `' + name + '` is used as an if-test twice or more;', targets.length);

    // Now test whether any of the targets is inside the blockChain of another target
    // For any hit, replace the ref with "true" or "false", depending on the branch
    for (let i=0; i<targets.length; ++i) {
      const reada = targets[i];
      for (let j=i+1; j<targets.length; ++j) {
        const readb = targets[j];
        // Note: the reads are in source order and a later ref can never be the parent `if` of a previous ref.
        // Ancestor check is done by removing the initial blockChain (the owner block) and then checking whether
        // the consequent or alternate block pids are the start of the remaining blockChain of b.
        if (readb.blockChain.slice(reada.blockChain.length).startsWith(reada.parentNode.consequent.$p.pid + ',')) {
          rule('When a const var is tested in nested `if` statements, the nested one knows the outcome; consequent');
          example('if (x) { if (y) $(); }', 'if (x) { if (true) $(); }');
          before(reada.parentNode);

          if (readb.parentIndex < 0) readb.parentNode[readb.parentProp] = AST.tru();
          else readb.parentNode[readb.parentProp][readb.parentIndex] = AST.tru();

          after(reada.parentNode);
          changed += 1;
        }
        else if (readb.blockChain.slice(reada.blockChain.length).startsWith(reada.parentNode.alternate.$p.pid + ',')) {
          rule('When a const var is tested in nested `if` statements, the nested one knows the outcome; alternate');
          example('if (x) { } else { if (y) $(); }', 'if (x) { } else { if (false) $(); }');
          before(reada.parentNode);

          if (readb.parentIndex < 0) readb.parentNode[readb.parentProp] = AST.fals();
          else readb.parentNode[readb.parentProp][readb.parentIndex] = AST.fals();

          after(reada.parentNode);
          changed += 1;
        }
      }
    }

  });

  if (changed) {
    log('Nested if-tests eliminated:', changed, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'ifTestNested', changes: changed, next: 'phase1'};
  }

  log('Nested if-tests eliminated: 0.');
  return false;
}
