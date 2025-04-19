// Search for values that have two ors with primitives so we can merge them.
// `const a = x | 16; const b = a | 32;`
// -> `const b = x | 48`

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

export function orOr(fdata) {
  group('\n\n\n[orOr] Searching for or-or\n');
  const r = _orOr(fdata);
  groupEnd();
  return r;
}
function _orOr(fdata) {
  let changed = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;
    if (!meta.typing.orredWith) return;

    // Find all reads of this meta in a OR expression to another primitive. Then merge them.

    if (meta.reads.length !== 1) return; // We have to update this var init so for now we only support this specific case where the binding is read as part of another OR
    const read = meta.reads[0];

    vlog('- `' + name + '` is orred with', meta.typing.orredWith, 'and read once as part of a', read.parentNode.type);

    if (read.parentNode.type !== 'BinaryExpression') {
      vlog('  - looking for binary expression');
      return;
    }
    if (read.parentNode.operator !== '|') {
      vlog('  - looking for OR expression');
      return;
    }
    const other = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;
    if (!AST.isPrimitive(other)) {
      vlog('  - one side of the OR expression of the read should be a primitive');
      return;
    }

    const pv = AST.getPrimitiveValue(other);
    vlog('  - Found a read inside an OR where the other value was primitive:', [pv]);

    ASSERT(meta.writes.length === 1, 'this is a constant, so ...');
    const write = meta.writes[0];
    ASSERT(write.kind === 'var', 'this is a constant and the write should be the var', write);

    const init = write.parentNode.init;

    // The `.orredWith` property may have been transferred so check to confirm that this var init was in fact that.
    // If it was transferred, we can't really apply this trick right now. Can probably do _something_ here tho?
    if (init.type !== 'BinaryExpression' || init.operator !== '|') {
      vlog('  - var init was not binary OR');
      return;
    }
    const pnode = AST.isPrimitive(init.left) ? init.left : AST.isPrimitive(init.right) ? init.right : undefined;
    if (!pnode) {
      vlog('  - var init did not have primitive');
      return;
    }
    const ipv = AST.getPrimitiveValue(pnode) | 0;
    if (ipv !== meta.typing.orredWith) {
      // Not sure how likely this is, but okay
      vlog('  - var init primitive did not match orredWith value', ipv, meta.typing.orredWith);
      return;
    }

    // Assert that the source node was a constant. Otherwise the next transform might be unsafe.
    const sourceNode = init.left === pnode ? init.right : init.left;
    if (sourceNode.type !== 'Identifier') {
      // TODO: can probably support some more cases here
      vlog('  - source node was not an ident');
      return;
    }
    const sourceMeta = fdata.globallyUniqueNamingRegistry.get(sourceNode.name);
    ASSERT(sourceMeta);
    if (!sourceMeta.isConstant && !sourceMeta.isBuiltin) {
      vlog('  - source node was not a constant nor a builtin, inlining is unsafe');
      return;
    }
    if (sourceMeta.isImplicitGlobal) {
      vlog('  - source node is implicit global, inlining is unsafe');
      return;
    }
    // Okay, we should be able to assume the source is immutable once set

    rule('Double ors where the first is only used in the second can be merged together');
    example('const a = x | 16; f(a | 32);', 'const a = x | 48; f(a);');
    before(write.blockBody[write.blockIndex]);
    before(read.blockBody[read.blockIndex]);

    pnode.value = pv | ipv;
    if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(meta.uniqueName);
    else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(meta.uniqueName);

    after(write.blockBody[write.blockIndex]);
    after(read.blockBody[read.blockIndex]);
    ++changed;
  });

  if (changed) {
    log('Ors melted:', changed, '. Restarting from phase1');
    return {what: 'orOr', changes: changed, next: 'phase1'};
  }

  log('Ors melted: 0.');
}
