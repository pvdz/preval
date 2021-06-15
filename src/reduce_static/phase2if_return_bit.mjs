// Find ifs that check whether a bit is set and only return either the set bit or zero.
// Pretty much an edge case.

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  fmat,
  tmat,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function ifReturnBit(fdata) {
  group('\n\n\nLooking for ifs that return a bit that they check');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _ifReturnBit(fdata);
  groupEnd();
  return r;
}
function _ifReturnBit(fdata) {
  let changed = 0;
  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;

    const bit = meta.typing.oneBitSet;
    if (!bit) return;

    vgroup('- `' + meta.uniqueName + '` has one bit set:', bit);
    process(meta);
    vgroupEnd();
  });

  function process(meta) {
    meta.reads.forEach((read, ri) => {
      vlog('-', ri, ':', read.parentNode.type + '.' + read.parentProp);
      const ifNode = read.parentNode;
      if (ifNode.type === 'IfStatement' && read.parentProp === 'test') {
        if (
          ifNode.consequent.body.length === 1 &&
          ifNode.alternate.body.length === 1 &&
          ifNode.consequent.body[0].type === 'ReturnStatement' &&
          ifNode.alternate.body[0].type === 'ReturnStatement' &&
          AST.isNumber(ifNode.consequent.body[0].argument) &&
          AST.isNumber(ifNode.alternate.body[0].argument) &&
          ifNode.consequent.body[0].argument.value === meta.typing.oneBitSet &&
          ifNode.alternate.body[0].argument.value === 0
        ) {
          rule('When an `if` exclusively returns the bit value of its test it may as well return the test');
          example('const a = x & 32; if (a) return 32; else return 0;', 'const a = x & 32; return a;');
          before(read.node, ifNode);

          read.blockBody[read.blockIndex] = AST.returnStatement(read.node);

          before(read.blockBody[read.blockIndex]);
          ++changed;
        }
      }
    });
  }

  if (changed) {
    log('Bit checking ifs replaced:', changed, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }

  log('Bit checking ifs replaced: 0');
}
