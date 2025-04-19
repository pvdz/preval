// Find nested ifs which test one-bit AND on the same binding with empty else branch
// `if (x & 16 && x x & 32) f();`
// -> `if ((x & 48) === 48) f();`
// (Does not work on multi-bit ands or values that spy)

// The problem with spies is that `if (x & 1 && x & 2)` might trigger coercion on `x` twice. In that case, our transform
// should maintain that but in doing so it must still check whether or not the second check should occur at all. And if
// we were to do that, we kind of moot the advantage in the first place. So we only apply this to values that do not spy.

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
  findBodyOffset, todo,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { PRIMITIVE_TYPE_NAMES_PREVAL } from '../constants.mjs';

export function andIfAndIf(fdata) {
  group('\n\n\n[andIfAndIf] Searching for and-if-and-if\n');
  const r = _andIfAndIf(fdata);
  groupEnd();
  return r;
}
function _andIfAndIf(fdata) {
  let changed = 0;
  const queue = [];
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;
    if (!meta.typing.oneBitAnded) return;
    if (meta.tainted) return;

    // Find all reads of this meta in a AND expression to another primitive. Then merge them.

    if (meta.reads.length !== 1) return; // We have to update this var init so for now we only support this specific case where the binding is read as part of another AND

    vlog('- `' + name + '` is anded with', meta.typing.oneBitAnded);

    const varWrite = meta.writes[0];
    ASSERT(varWrite?.kind === 'var');

    const init = varWrite.parentNode.init;
    ASSERT(init.type === 'BinaryExpression' && init.operator === '&');

    let identNode;
    let litNode;
    if (!AST.isPrimitive(init.left)) {
      ASSERT(AST.isPrimitive(init.right));
      identNode = init.left;
    } else if (!AST.isPrimitive(init.right)) {
      ASSERT(AST.isPrimitive(init.left));
      identNode = init.right;
    } else {
      // Literal on both sides. Let another rule resolve this completely.
      return;
    }

    // Can only do this on values that do not spy... because otherwise the transform is kind of moot in order to maintain observable side effects.
    const identMeta = fdata.globallyUniqueNamingRegistry.get(identNode.name);
    ASSERT(identMeta);
    if (identMeta.typing.mustBeType === 'array') todo('Are we sure array is safe here without testing its contents? Find test case and confirm');
    if (!PRIMITIVE_TYPE_NAMES_PREVAL.has(identMeta.typing.mustBeType) && !['regex', 'array', 'promise', 'class'].includes(identMeta.typing.mustBeType)) return;

    // This rule is looking for this pattern: `if (x & 8 && x & 16) {}`
    // In normalized code that is `const t; if (t) { const t2; if (t2) {} else {} } else { <empty> }`
    // The inner const and if must be back to back and the only thing inside the `then`.

    vgroup('- Scanning reads');
    meta.reads.forEach((read, ri) => {
      vlog('-', ri);
      if (read.parentNode.type !== 'IfStatement') return vlog('  - Not an if');

      const outerIfNode = read.parentNode;
      if (outerIfNode.alternate.body.length !== 0) return vlog('  - `else` not empty');
      if (outerIfNode.consequent.body.length !== 2) return vlog('  - `then` not two statements'); // Must be a `var` and an `if` and otherwise it's not the target pattern

      const innerVarNode = outerIfNode.consequent.body[0];
      ASSERT(innerVarNode?.type === 'VarStatement', 'apparently we asserted this?');
      const innerIfNode = outerIfNode.consequent.body[1];

      // Now confirm that
      // - the inner if is testing the preceding var node binding, and
      // - this binding has an AND init on the same binding as `identNode`

      if (innerIfNode.test.type !== 'Identifier') return vlog('  - inner if test not ident');
      const id = innerVarNode.id;
      if (id.name !== innerIfNode.test.name) return vlog('  - inner if not testing same ident'); // Not testing on that ident (why is it even there ugh)

      const init2 = innerVarNode.init;
      if (init2.type !== 'BinaryExpression') return vlog('  - inner var init not binary');
      if (init2.operator !== '&') return vlog('  - inner var init not AND');

      const innerMeta = fdata.globallyUniqueNamingRegistry.get(id.name);
      if (innerMeta.tainted) return vlog('  - meta tainted');
      const innerAnded = innerMeta.typing.oneBitAnded;
      if (!innerAnded) {
        //vlog('->', fdata.globallyUniqueNamingRegistry.get(id.name).typing)
        // Trick does not work for multi-bit ANDs
        return vlog('  - inner var init not single bit and');
      }

      // One of the left or right must be a primitive and the other an ident, for this pattern to match
      // Additionally, the ident must be the same as the initial one. So if it's not, get out.
      let identNode2;
      if (!AST.isPrimitive(init2.left)) {
        if (init2.left.type !== 'Identifier' || init2.left.name !== identNode.name)
          return vlog('  - inner init not ANDing on same ident (1)');
      } else if (!AST.isPrimitive(init.right)) {
        ASSERT(AST.isPrimitive(init.left));
        if (init2.right.type !== 'Identifier' || init2.right.name !== identNode.name)
          return vlog('  - inner init not ANDing on same ident (2)');
      } else {
        ASSERT(false);
      }

      // I believe at this point the pattern is confirmed...
      // We should now be able to merge the two ifs

      meta.tainted = true;
      innerMeta.tainted = true;
      queue.push({
        index: varWrite.blockIndex,
        func: () => {
          rule('Nested and-if-and-if pattern can be melted');
          example(
            'const x = a & 8; if (x) { const y = a & 2; if (y) { f(); }',
            'const tmp = a & 10; const x = tmp === 10; if (x) { f(); }',
          );
          before(varWrite.blockBody[varWrite.blockIndex]);
          before(outerIfNode);

          outerIfNode.consequent = innerIfNode.consequent;
          varWrite.parentNode.init = AST.binaryExpression(
            '&',
            AST.identifier(identNode.name),
            AST.primitive(meta.typing.oneBitAnded | innerAnded),
          );
          varWrite.blockBody.splice(
            varWrite.blockIndex + 1,
            0,
            innerVarNode,
            AST.expressionStatement(AST.binaryExpression('&', AST.identifier(identNode.name), AST.primitive(0))),
          );
          innerVarNode.init = AST.binaryExpression('===', name, AST.primitive(meta.typing.oneBitAnded | innerAnded));
          outerIfNode.test = AST.identifier(innerVarNode.id.name);

          after(varWrite.blockBody[varWrite.blockIndex]);
          after(varWrite.blockBody[varWrite.blockIndex + 1]);
          after(varWrite.blockBody[varWrite.blockIndex + 2]);
          after(varWrite.blockBody[varWrite.blockIndex + 3]);
        },
      });
    });
    vgroupEnd();
  });

  if (queue.length) {
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('And-Ifs melted:', queue.length, '. Restarting from phase1');
    return {what: 'andIfAndIf', changes: queue.length, next: 'phase1'};
  }

  log('And-Ifs melted: 0.');
}
