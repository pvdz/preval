// Find constants whose assignment is redundant because the rhs is an ident that won't be changed between declaration and usage
// This is a common artifact left by normalization, which does not use scope tracking, and has to be safe.

import walk from '../../lib/walk.mjs';
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

export function dealiasing(fdata) {
  group('\n\n\nSearching for let-alias constants that are redundant so we can dealias them\n');
  const r = _dealiasing(fdata);
  groupEnd();
  return r;
}
function _dealiasing(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let dropped = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') return; // catch, for-x, ???
    if (!meta.isConstant) return; // I don't think this really matters. But perhaps in that case we should just skip the lets...

    vgroup('- Considering `' + name + '`,', meta.reads.length, meta.writes.length);

    if (meta.reads.length !== 1) {
      // TODO: This particular artifact is around a single declaration+usage but it should apply to any number of usages.
      vlog('More than one read. Bailing.');
      return;
    }

    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    const write = meta.writes[0];
    const read = meta.reads[0];

    // Note: it's not just the alias we need to check. We must also confirm that the aliased ident is in fact not updated (!)

    // Determine whether the var decl was assigning another ident (not param or literal or whatever)

    if (write.parentNode.init.type !== 'Identifier') {
      vlog('Init was not an identifier. Bailing');
      return;
    }

    const realName = write.parentNode.init.name;

    // Confirm that this ident could not have changed between the var decl and the read.
    // The common pattern I want to tackle here has them in the same block.
    // TODO: copy paste the check that can move into other blocks

    if (read.blockBody !== write.blockBody) {
      vlog('Not in same block. Bailing for now. TODO');
      return;
    }

    vlog('Checking all nodes in between for observable side effects...', write.blockIndex, read.blockIndex);
    for (let i = write.blockIndex + 1; i < read.blockIndex; ++i) {
      if (!AST.nodeHasNoObservableSideEffectNorStatements(write.blockBody[i], false)) {
        vlog('  -', i, ': yes, bailing');
        return;
      } else if (AST.ssaCheckMightContainIdentName(write.blockBody[i], realName)) {
        vlog('  -', i, ': contained reference ot real name, bailing');
        return;
      } else {
        vlog('  -', i, ': nope');
      }
    }

    vlog('It seems `' + name + '` was an unnecessary alias for `' + realName + '`. Renaming it now.');

    rule(
      'If a constant binding was an alias for an ident that could not have changed between the write and the read then the constant is redundant and should be eliminated',
    );
    example('const x = y; f(x);', 'f(y);');
    before(write.blockBody[write.blockIndex]);
    before(read.blockBody[read.blockIndex]);

    read.node.name = realName;
    write.blockBody[write.blockIndex] = AST.emptyStatement();

    after(write.blockBody[write.blockIndex]);
    after(read.blockBody[read.blockIndex]);
    ++dropped;
  }

  if (dropped) {
    log('Dropped aliases:', dropped, '. Restarting from phase1');
    return 'phase1';
  }

  log('Dropped aliases: 0.');
}
