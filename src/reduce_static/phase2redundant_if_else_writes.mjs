// Find specific pattern of conditional let init with redundant assignment
//
// `let x = 1; if (y) x = 1; else x = 2;`
//          ^         ^^^^^

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

export function redundantWrites(fdata) {
  group('\n\n\nFinding redundant writes');
  const r = _redundantWrites(fdata);
  groupEnd();
  return r;
}
function _redundantWrites(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (meta.isConstant) return; // Can't have redundant writes if you can't have more than one
    if (!meta.singleScoped) return; // TODO: we can go the hard way on this one?
    if (meta.writes.length !== 3) return; // meh. specific pattern

    vgroup('-- name: `' + name + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    const varWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varWrite, 'all constants have a var', meta);
    if (!AST.isPrimitive(varWrite.parentNode.init)) return;
    //const initValue = AST.getPrimitiveValue(varWrite.parentNode.init);

    // There should be three writes and one of them is the var. So...
    const w1 = meta.writes[0] === varWrite ? meta.writes[1] : meta.writes[0];
    const w2 = meta.writes[2] === varWrite ? meta.writes[1] : meta.writes[2];

    varWrite.blockBody.some((node, ni) => {
      // Find an `if` in the same scope of the binding that contains both writes
      if (ni <= varWrite.blockIndex) return;
      if (node.type !== 'IfStatement') return;

      if (varWrite.reachedByReads.size === 0) {
        vlog('The init could not be observed so replace it with either init as long as it is primitive');
      }

      // Check whether the two writes use both branches
      if (
        w1.blockBody === w2.blockBody ||
        (w1.blockBody !== node.consequent.body &&
          w1.blockBody !== node.alternate.body &&
          w2.blockBody !== node.consequent.body &&
          w2.blockBody !== node.alternate.body)
      ) {
        return;
      }

      vlog('Should now have two writes for a var decl that occur in a `then` and `else` branch of an `if` on the same level as the `var`');

      if (AST.isPrimitive(w1.parentNode.right)) {
        if (varWrite.reachedByReads.size === 0) {
          rule('When the init of a binding cannot be observed it can be replaced with the primitive rhs of an assignment');
          example('let x = 0; if (a) x = 1; else x = 2;', 'let x = 1; if (a) ; else x = 2;');
          before(varWrite.blockBody[varWrite.blockIndex]);
          before(w1.blockBody[w1.blockIndex]);

          varWrite.parentNode.init = w1.parentNode.right;
          w1.blockBody[w1.blockIndex] = AST.emptyStatement();

          before(varWrite.blockBody[varWrite.blockIndex]);
          ++changes;
          return true;
        }

        if (
          AST.isPrimitive(varWrite.parentNode.init) &&
          Object.is(AST.getPrimitiveValue(varWrite.parentNode.init), AST.getPrimitiveValue(w1.parentNode.right))
        ) {
          rule('A write that is the same as the init can be dropped');
          example('let x = 0; if (a) x = 0; else x = 2;', 'let x = 0; if (a) ; else x = 2;');
          before(w1.blockBody[w1.blockIndex]);

          w1.blockBody[w1.blockIndex] = AST.emptyStatement();

          before(w1.blockBody[w1.blockIndex]);
          ++changes;
          return true;
        }
      } else if (AST.isPrimitive(w2.parentNode.right)) {
        if (varWrite.reachedByReads.size === 0) {
          rule('When the init of a binding cannot be observed it can be replaced with the primitive rhs of an assignment');
          example('let x = 0; if (a) x = 1; else x = 2;', 'let x = 1; if (a) ; else x = 2;');
          before(varWrite.blockBody[varWrite.blockIndex]);
          before(w2.blockBody[w2.blockIndex]);

          varWrite.parentNode.init = w2.parentNode.right;
          w2.blockBody[w2.blockIndex] = AST.emptyStatement();

          before(varWrite.blockBody[varWrite.blockIndex]);
          ++changes;
          return true;
        }

        if (
          AST.isPrimitive(varWrite.parentNode.init) &&
          Object.is(AST.getPrimitiveValue(varWrite.parentNode.init), AST.getPrimitiveValue(w2.parentNode.right))
        ) {
          rule('A write that is the same as the init can be dropped');
          example('let x = 0; if (a) x = 0; else x = 2;', 'let x = 0; if (a) ; else x = 2;');
          before(w2.blockBody[w2.blockIndex]);

          w2.blockBody[w2.blockIndex] = AST.emptyStatement();

          before(w2.blockBody[w2.blockIndex]);
          ++changes;
          return true;
        }
      }
    });

    vgroupEnd();
  });

  if (changes) {
    log('Redundant writes eliminated:', changes, '. Restarting from phase1');
    return 'phase1';
  }

  log('Redundant writes eliminated: 0.');
}
