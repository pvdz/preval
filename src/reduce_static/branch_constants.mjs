// Search for constants whose value is known in a branch (after eq-check, for example)
// `const a = $(); const x = a === 300; if (x) f(a); else g(a);`
// -> `const a = $(); const x = a === 300; if (x) f(300); else g(a);`

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

export function branchConstantInlining(fdata) {
  group('\n\n\n[branchConstantInlining] Searching for constants whose value is known in a branch\n');
  const r = _branchConstantInlining(fdata);
  groupEnd();
  return r;
}
function _branchConstantInlining(fdata) {
  let changed = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;
    if (meta.writes.length !== 1) return; // runtime error

    const write = meta.writes[0];
    ASSERT(write.kind === 'var', 'this is a constant and the write should be the var', write);

    const init = write.parentNode.init;

    // Sadly this trick does not work on !== due to NaN and Infinity edge cases. It may work on Object.is ...
    if (init.type !== 'BinaryExpression' || init.operator !== '===') return;

    const left = init.left;
    const right = init.right;
    const lip = AST.isPrimitive(left);
    const rip = AST.isPrimitive(right);

    let targetName = '';
    let pnode;
    if (lip && !rip && right.type === 'Identifier') {
      targetName = right.name;
      pnode = left;
    } else if (rip && !lip && left.type === 'Identifier') {
      targetName = left.name;
      pnode = right;
    } else {
      return;
    }

    const targetMeta = fdata.globallyUniqueNamingRegistry.get(targetName);
    ASSERT(targetMeta);

    if (!targetMeta.isConstant && !targetMeta.isBuiltin) return;

    const pv = AST.getPrimitiveValue(pnode);

    // Okay, this binding asserts that targetName is equal to pv
    // For any `if` that tests on that name, inline the pv in the `then` branch

    meta.reads.forEach((read) => {
      if (read.parentNode.type === 'IfStatement' && read.parentProp === 'test') {
        const ifNode = read.parentNode;
        const ifThenStartPid = ifNode.consequent.$p.npid;
        const ifThenEndPid = ifNode.alternate.$p.npid;
        // Find any ref to target that falls within the `then` branch and replace its node with the pv
        targetMeta.reads.forEach((tread) => {
          if (tread.node.$p.npid > ifThenStartPid && tread.node.$p.npid < ifThenEndPid) {
            rule('An unknown constant asserted to be a certain primitive inside an `if` branch can be inlined');
            example('const x = f(); if (x === 10) g(x);', 'const x = f(); if (x === 10) g(10);');
            before(tread.blockBody[tread.blockIndex]);

            if (tread.parentIndex < 0) tread.parentNode[tread.parentProp] = AST.primitive(pv);
            else tread.parentNode[tread.parentProp][tread.parentIndex] = AST.primitive(pv);

            after(tread.blockBody[tread.blockIndex]);
            ++changed;
          }
        });
      }
    });
  });

  if (changed) {
    log('Branch constants inlined:', changed, '. Restarting from phase1');
    return {what: 'branchConstantInlining', changes: changed, next: 'phase1'};
  }

  log('Branch constants inlined: 0.');
}
