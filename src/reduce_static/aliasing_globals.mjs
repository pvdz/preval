// Rename constants when they are initialized with a known implivit global
// `const x = $array_push; $(x)`
// -> `$($array_push)`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import globalNames from "../globals.mjs"
import { symbo } from '../symbols_builtins.mjs';

export function aliasedGlobals(fdata) {
  group('\n\n\nInlining implicit globals assigned to constants\n');
  const r = _aliasedGlobals(fdata);
  groupEnd();
  return r;
}
function _aliasedGlobals(fdata) {
  const ast = fdata.tenkoOutput.ast;

  // `const a = x; f(a);` --> `f(x);`

  let dropped = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return; // We're looking for bindings, implicit globals aren't bindings
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (!meta.isConstant) return; // Let's deal with lets later... if necessary/feasible
    if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') return; // catch, for-x, ???

    const init = meta.constValueRef.containerNode.declarations[0].init;
    if (init.type !== 'Identifier') return;
    if (init.name === '$') return; // Special test token that we don't want to de-alias here. Treat as unknown implicit global.
    if (!globalNames.has(init.name)) return; // Not a known global

    vgroup('- Considering whether `' + name + '` is an unnecessary alias to a known implicit global,', meta.reads.length, init.name);
    process(meta, name, init.name);
    vgroupEnd();
  });

  function process(aliasMeta, aliasName, globalName) {
    const write = aliasMeta.writes[0];
    const reads = aliasMeta.reads;

    rule('Assigning known implicit globals to constants should eliminate the constant in favor of the global');
    example(`const x = ${symbo('array', 'push')}; $(x);`, `$(${symbo('array', 'push')})`);
    before(write.blockBody[write.blockIndex]);

    // Drop decl
    write.blockBody[write.blockIndex] = AST.emptyStatement();

    // Rename all reads
    reads.forEach(read => {
      read.node.name = globalName;
    });


    after(write.blockBody[write.blockIndex]);
    ++dropped;
  }

  if (dropped) {
    log('Inlined global aliases:', dropped, '. Restarting from phase1');
    return {what: 'aliasedGlobals', changes: dropped, next: 'phase1'};
  }

  log('Inlined global aliases: 0.');
}
