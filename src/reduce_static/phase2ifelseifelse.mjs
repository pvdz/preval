// Attempts to catch all variations of a common pattern of normalized code that I've dubbed "ifelseifelse" (even though it's a bit more than that):
/*
let condition = true;
const f = function() {
  if (condition) {
    $('a');
  } else {
    $('b');
  }
};
if (condition) {
  condition = true;
  f();
} else {
  f();
}
*/

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
import { createFreshVar } from '../bindings.mjs';

export function ifelseifelse(fdata) {
  group('\n\n\nChecking for the ifElseIfElse pattern');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _ifelseifelse(fdata);
  groupEnd();
  return r;
}
function _ifelseifelse(fdata) {
  let changed = 0;

  // Look for:
  // - a let binding that is used in an `if` test
  // - updated in one branch of this if (not both? does it matter?)
  // - also and only used as an if-test in a nested function

  new Map(fdata.globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return;

    vgroup('- name: `' + name + '`');
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    // This targets a very specific pattern right now. See top of file.

    if (meta.reads.length !== 2 || meta.writes.length !== 2) {
      vlog('Expecting two reads and two writes');
      return;
    }

    const varDeclWrite = meta.writes[0];
    ASSERT(varDeclWrite.action === 'write');
    if (varDeclWrite.kind !== 'var') {
      // Otherwise this is either a closure or a TDZ or a loop
      vlog('The var decl must be the first write');
      return;
    }

    const write = meta.writes[1];
    ASSERT(write.action === 'write');
    if (write.kind !== 'assign') {
      // for-x, catch, whatever
      vlog('The write was not an assignment');
      return;
    }
    if (write.pfuncNode !== varDeclWrite.pfuncNode) {
      vlog('The write must be in the same scope as the var decl');
      return;
    }
    if (write.blockBody === varDeclWrite.blockBody) {
      vlog('The write must be nested so in a different block body from the var decl');
      return;
    }
    if (!write.blockChain.startsWith(varDeclWrite.blockChain + ',')) {
      vlog('The write must reach the var decl', [varDeclWrite.blockChain, write.blockChain]);
      return;
    }

    const read1 = meta.reads[0];
    const read2 = meta.reads[1];
    if ((read1.pfuncNode === varDeclWrite.pfuncNode) === (read2.pfuncNode === varDeclWrite.pfuncNode)) {
      vlog(
        'One read must be in the same scope as the var decl and the other must not be',
        varDeclWrite.pfuncNode.$p.pid,
        read1.pfuncNode.$p.pid,
        read2.pfuncNode.$p.pid,
      );
      return;
    }

    const nestedRead = read1.pfuncNode === varDeclWrite.pfuncNode ? read2 : read1;
    const topRead = nestedRead === read1 ? read2 : read1;

    if (
      read1.parentNode.type !== 'IfStatement' ||
      read1.parentProp !== 'test' ||
      read2.parentNode.type !== 'IfStatement' ||
      read2.parentProp !== 'test'
    ) {
      vlog('The reads must be the test of an `if`', read1.parentNode.type, read1.parentProp, read2.parentNode.type, read2.parentProp);
      return;
    }

    if (!write.blockChain.startsWith(topRead.blockChain)) {
      vlog('The write was not in either branch of the `if` that tested the first read');
      return;
    }

    // So we have a binding with two reads and two writes, one of the reads is in a nested scope, the rest is
    // in the same scope as the decl. The reads are both if-tests. The write happens in a different block.

    if (nestedRead.pfuncNode.$p.uniqueName === undefined) {
      // If it's not a constant, we can't guarantee its name, so we can't fetch its meta, etc.
      vlog('The nested function containing the ref was not bound as a constant', nestedRead.pfuncNode);
      return;
    }

    const nestedFuncMeta = fdata.globallyUniqueNamingRegistry.get(nestedRead.pfuncNode.$p.uniqueName);
    ASSERT(nestedFuncMeta);
    ASSERT(nestedFuncMeta.isConstant, 'if this is not a constant then why does the func node have a $p.uniqueName ???');
    ASSERT(!nestedFuncMeta.isBuiltin && !nestedFuncMeta.isImplicitGlobal, 'I think these cases should not have a $p.uniqueName either');

    // Confirm that the function is called twice, and that this occurs in either side of a branch of the same `if`
    if (nestedFuncMeta.reads.length !== 2) {
      vlog('The nested func is not called exactly twice');
      return;
    }

    const nestedFuncRead1 = nestedFuncMeta.reads[0];
    const nestedFuncRead2 = nestedFuncMeta.reads[1];

    if (nestedFuncRead1.blockChain === nestedFuncRead2.blockChain) {
      vlog('The nested function was called twice in the same block');
      return;
    }

    if (nestedFuncRead1.blockIds.slice(0, -1).join(',') !== nestedFuncRead2.blockIds.slice(0, -1).join(',')) {
      vlog('The nested function was not called in either branch of a common if');
      return;
    }

    if (nestedFuncRead1.parentNode.type !== 'CallExpression' || nestedFuncRead2.parentNode.type !== 'CallExpression') {
      vlog('The nested function was not called in at least one of its two reads');
      return;
    }

    // The function containing the only other read is a nested function, and it is called twice in either branch of
    // the same `if` statement.

    vlog('Attempting SSA now');
    // Inject a new variable, initialize it to undefined, inject an assignment in the other branch and set it to
    // the original binding. Replace the other read to use the new name as well. This should leave the var decl
    // to have only two reads which should allow it to become a constant.

    rule('A var that is tested for, updated in one branch, then tested again in another func, can have SSA applied');
    example(
      'let x = f(); if (x) { x = g(); h(); } else { h(); } function h(){ if (x) a(); else b(); }',
      'const x = f(); let y = undefined; if (x) { y = g(); h(); } else { y = false; h(); } function h(){ if (y) a(); else b(); }',
    );
    before(meta.bfuncNode);

    const ifStatement = topRead.parentNode;
    const tmpName = createFreshVar('tmpIfelseifelse', fdata);
    topRead.blockBody.splice(topRead.blockIndex, 0, AST.variableDeclaration(tmpName, 'undefined', 'let'));
    if (write.blockIds[write.blockIds.length - 1] === +ifStatement.consequent.$p.pid) {
      // This means the condition was overwritten in the truthy branch. So inject `false` in the falsy
      // branch. Since we know the value is only used in an if-test, the actual old value is irrelevant.
      vlog('Inject the new write into the `else` branch as `false`');
      ifStatement.alternate.body.unshift(AST.expressionStatement(AST.assignmentExpression(tmpName, AST.fals())));
    } else if (write.blockIds[write.blockIds.length - 1] === +ifStatement.alternate.$p.pid) {
      // This means the condition was overwritten in the falsy branch. So inject `true` in the truthy
      // branch. Since we know the value is only used in an if-test, the actual old value is irrelevant.
      vlog('Inject the new write into the `if` branch as `true`');
      ifStatement.consequent.body.unshift(AST.expressionStatement(AST.assignmentExpression(tmpName, AST.tru())));
    } else {
      ASSERT(false, 'we should have confirmed that the write was a direct child of either branch');
    }

    write.node.name = tmpName;
    nestedRead.node.name = tmpName;

    after(meta.bfuncNode);
    ++changed;
  }

  if (changed) {
    log('IfElseIfElse patterns captured:', changed, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('IfElseIfElse patterns captured: 0');
}
