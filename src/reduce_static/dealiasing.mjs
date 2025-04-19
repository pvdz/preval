// Find constants whose assignment is redundant because the rhs is an ident that won't be changed between declaration and usage
// This is a common artifact left by normalization, which does not use scope tracking, and has to be safe.

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
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';

export function dealiasing(fdata) {
  group('\n\n\n[dealiasing] Searching for let-alias constants that are redundant so we can dealias them\n');
  const r = _dealiasing(fdata);
  groupEnd();
  return r;
}
function _dealiasing(fdata) {
  const ast = fdata.tenkoOutput.ast;

  // `const a = x; f(a);` --> `f(x);`

  let dropped = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (meta.kind !== 'var') return;
    if (!meta.isConstant) return; // I don't think this really matters. But perhaps in that case we should just skip the lets...

    vgroup('- Considering whether `' + name + '` is an unnecessary alias,', meta.reads.length, meta.writes.length);

    if (meta.reads.length !== 1) {
      // TODO: This particular artifact is around a single declaration+usage but it should apply to any number of usages.
      vlog('More than one read. Bailing.');
      vgroupEnd();
      return;
    }

    process(meta, name);
    vgroupEnd();
  });

  function process(aliasMeta, name) {
    const write = aliasMeta.writes[0];
    const read = aliasMeta.reads[0];

    // Determine whether the var decl was assigning another ident (not param or literal or whatever)

    if (write.parentNode.init.type !== 'Identifier') {
      vlog('Init was not an identifier. Bailing');
      return;
    }

    // Note: it's not just the alias we need to check. We must also confirm that the aliased ident is in fact not updated (!)
    const realName = write.parentNode.init.name;
    if (realName === 'arguments') {
      vlog('Skipping `arguments` alias');
      return;
    }

    const originalMeta = fdata.globallyUniqueNamingRegistry.get(realName);
    ASSERT(originalMeta || realName === 'arguments', 'the meta for the init ident should be available...', originalMeta, realName);

    // Technically correct but for now I'm going to let this go. It will mess up with errors triggered by implicit globals that don't exist
    //if (originalMeta.isImplicitGlobal) {
    //  vlog('the init is an implicit global. Cannot safely continue because it may prevent a crash');
    //  return;
    //}

    vlog('Checking if it could have been mutated between write and read');
    if (
      !originalMeta.isBuiltin &&
      !originalMeta.isConstant &&
      mayBindingMutateBetweenRefs(originalMeta || realName, write, read)
    ) {
      vlog('  - yes, bailing');
      return;
    }

    vlog('It seems `' + name + '` was an unnecessary alias for `' + realName + '`. Renaming it now.');

    rule(
      'If a constant binding was an alias for an ident that could not have changed between the write and the read then the constant is redundant and should be eliminated',
    );
    example('const x = y; f(x);', 'y; f(y);');
    before(write.blockBody[write.blockIndex]);
    before(read.blockBody[read.blockIndex]);

    read.node.name = realName;
    write.blockBody[write.blockIndex] = AST.expressionStatement(AST.identifier(realName));

    after(write.blockBody[write.blockIndex]);
    after(read.blockBody[read.blockIndex]);
    ++dropped;
  }

  if (dropped) {
    log('Dropped aliases:', dropped, '. Restarting from phase1');
    return {what: 'dealiasing', changes: dropped, next: 'phase1'};
  }

  log('Dropped aliases: 0.');
}
