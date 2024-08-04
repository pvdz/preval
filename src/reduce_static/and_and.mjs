// Search for values that have two ands with primitives so we can merge them.
// `const a = x & 48; const b = a & 32;`
// -> `const b = x & 16`

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

export function andAnd(fdata) {
  group('\n\n\nSearching for and-and\n');
  const r = _andAnd(fdata);
  groupEnd();
  return r;
}
function _andAnd(fdata) {
  let changed = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;
    if (!meta.typing.anded) return;

    // Find all reads of this meta in a AND expression to another primitive. Then merge them.

    if (meta.reads.length !== 1) return; // We have to update this var init so for now we only support this specific case where the binding is read as part of another AND
    const read = meta.reads[0];

    vlog('- `' + name + '` is anded with', meta.typing.anded);

    if (read.parentNode.type !== 'BinaryExpression') {
      vlog('  - looking for binary expression');
      return;
    }
    if (read.parentNode.operator !== '&') {
      vlog('  - looking for AND expression');
      return;
    }
    const other = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;
    if (!AST.isPrimitive(other)) {
      vlog('  - one side of the AND expression of the read should be a primitive');
      return;
    }

    const pv = AST.getPrimitiveValue(other);
    vlog('  - Found a read inside an AND where the other value was primitive:', [pv]);

    ASSERT(meta.writes.length === 1, 'this is a constant, so ...');
    const write = meta.writes[0];
    ASSERT(write.kind === 'var', 'this is a constant and the write should be the var', write);

    const init = write.parentNode.init;

    // The `.anded` property may have been transferred so check to confirm that this var init was in fact that.
    // If it was transferred, we can't really apply this trick right now. Can probably do _something_ here tho?
    if (init.type !== 'BinaryExpression' || init.operator !== '&') {
      vlog('  - var init was not binary AND');
      return;
    }
    const pnode = AST.isPrimitive(init.left) ? init.left : AST.isPrimitive(init.right) ? init.right : undefined;
    if (!pnode) {
      vlog('  - var init did not have primitive');
      return;
    }
    const ipv = AST.getPrimitiveValue(pnode) | 0;
    if (ipv !== meta.typing.anded) {
      // Not sure how likely this is, but okay
      vlog('  - var init primitive did not match anded value', ipv, meta.typing.anded);
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

    rule('Double ors can be merged together');
    example('const a = x & 48; f(a & 32);', 'const a = x & 32; f(a);');
    before(write.blockBody[write.blockIndex]);
    before(read.blockBody[read.blockIndex]);

    pnode.value = pv & ipv;
    if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.identifier(meta.uniqueName);
    else read.grandNode[read.grandProp][read.grandIndex] = AST.identifier(meta.uniqueName);

    after(write.blockBody[write.blockIndex]);
    after(read.blockBody[read.blockIndex]);
    ++changed;
  });

  if (changed) {
    log('Ands melted:', changed, '. Restarting from phase1');
    return {what: 'andAnd', changes: changed, next: 'phase1'};
  }

  log('Ands melted: 0.');
}
