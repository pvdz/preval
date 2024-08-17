// Find constants whose assignment is redundant because the rhs is a constant or an ident that
// won't change between declaration and usage.
// This is a common artifact left by normalization, which does not use scope tracking, and has to be safe.
//
//        const x = 1; const y = x; x = 2; $(x, y);
// ->     const x = 1; const y = x; x = 2; $(x, x);
//
//        const x = $(); const y = x; $(x, y);
// ->     const x = $(); const y = x; $(x, x);
//
//        const x = this; const y = x; $(x, y);
// ->     const x = this; const y = x; $(x, x);
//


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
  findBodyOffset, riskyRule,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';
import { ASSUME_BUILTINS } from '../constants.mjs';

export function constAliasing(fdata) {
  group('\n\n\nSearching for two const values that get assigned to each other\n');
  const r = _constAliasing(fdata);
  groupEnd();
  return r;
}
function _constAliasing(fdata) {
  // `const a = x; const b = a; f(b);` --> `f(a);`

  let dropped = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, lhsName) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (!meta.isConstant) return;
    if (meta.constValueRef?.containerNode.type !== 'VariableDeclaration') return; // catch, ???
    if (meta.constValueRef.containerNode.declarations[0].init.type !== 'Identifier') return;

    const rhsName = meta.constValueRef.containerNode.declarations[0].init.name;
    if (rhsName === lhsName) return; // TDZ but not my problem
    if (rhsName === 'arguments') return;
    const meta2 = fdata.globallyUniqueNamingRegistry.get(rhsName);
    if (meta2.isImplicitGlobal) return;
    if (meta2.isExport) return; // Exports are "live" bindings so any update to it might be observable in strange ways
    if (meta2.isBuiltin) {
      // special case aliasing a known builtin global. `const f = Array;`

      // Replace all occurrences of the binding name with the global name
      // Since built-ins are not constants, they can be overridden, so we must be a bit careful here
      if (ASSUME_BUILTINS) {
        vlog('Replacing all cases of "', rhsName, '" with "', lhsName, '"');

        riskyRule('An alias to a built-in global should be renamed to that global');
        example('const x = Array; f(x);', 'f(Array);');
        before(meta.constValueRef.containerNode);

        vgroup();
        meta.reads.forEach(read => {
          before(read.blockBody[read.blockIndex]);

          if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(rhsName);
          else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(rhsName);

          after(read.blockBody[read.blockIndex]);
        });
        vgroupEnd();

        after(meta.constValueRef.containerNode);
        dropped += 1;
        return;
      }

      return
    }
    if (meta2.isConstant) {
      // Main case we target here. `const x = 1; const y = x;`
      if (meta2.constValueRef?.containerNode.type !== 'VariableDeclaration') return; // catch, ???

      vlog('Replacing all cases of "', rhsName, '" with "', lhsName, '"');

      rule('A constant that aliases another constant should have all refs to the second one replaced by the name of the first');
      example('const x = foo; const y = x; f(y);', 'const x = foo; const y = x; f(x);');
      before(meta.constValueRef.containerNode);
      before(meta2.constValueRef.containerNode);

      vgroup();
      meta.reads.forEach(read => {
        before(read.blockBody[read.blockIndex]);

        if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.identifier(rhsName);
        else read.parentNode[read.parentProp][read.parentIndex] = AST.identifier(rhsName);

        after(read.blockBody[read.blockIndex]);
      });
      vgroupEnd();

      after(meta.constValueRef.containerNode);
      after(meta2.constValueRef.containerNode);
      dropped += 1;

      return;
    }

    // Probably not our target...

  });

  if (dropped) {
    log('Dropped const aliases:', dropped, '. Restarting from phase1');
    return {what: 'constAliasing', changes: dropped, next: 'phase1'};
  }

  log('Dropped const aliases: 0.');
}
