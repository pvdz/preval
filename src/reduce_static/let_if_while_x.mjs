// Find a while that is preceded by a particular init pattern of the test expression
// `let y = true; let x = $(); if (x) {} else y = false; while (y) { ...; y = false; }`
// `let y = true; let x = $(); if (x) {} else y = false; while (y) { x = $(); if (x) {} else break; } $(x)`
// --> `let x = $(); let y = x; while (y) { ...; y = false; }`

// It's a common artifact left behind by our code

import walk from '../../lib/walk.mjs';
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
import {createFreshLabel, createFreshVar, mayBindingMutateBetweenRefs} from '../bindings.mjs';
import {RESET, GREEN, VERBOSE_TRACING} from '../constants.mjs';
import {deepCloneForFuncInlining} from "../ast.mjs"

export function letIfElseFalseWhile(fdata) {
  group('\n\n\nChecking for let-if-while');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _letIfElseFalseWhile(fdata);
  groupEnd();
  return r;
}
function _letIfElseFalseWhile(fdata) {
  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('Total let-if-else-false-while unrolled:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'restart';
  }
  log('Total let-if-else-false-while unrolled: 0.');
}

function processAttempt(fdata, unrollTrueLimit) {
  let updated = 0;

  // We're looking for `while` whose test condition is `true`
  // We need to copy its body and prepend it in a block
  // The copy needs to have break, continue. We bail if it has labels or labeled continue/break.
  // Limits: maybe size of body should be capped/configurable. Counter should be configurable.

  const ast = fdata.tenkoOutput.ast;

  walk(_walker, ast, 'ast');
  function _walker(whileNode, beforeWalk, nodeType, path) {
    if (beforeWalk) return; // Go from inner to outer...?
    if (updated) return; // TODO: allow to do this for multiple loops in the same iteration as long as they're not nested
    if (whileNode.type !== 'WhileStatement') return;

    // Look for a while with an ident ("test") that is preceded by an `if (x) {} else { test = false; }`
    // and confirm that `x` and the `test` ident have one read.

    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

    if (blockIndex === 0) return vlog('- bail: while is first statement in block');
    if (whileNode.test.type !== 'Identifier') return vlog('- bail: while test is not an identifier', whileNode.test.type);
    const ifNode = blockBody[blockIndex - 1];
    if (ifNode.type !== 'IfStatement') return vlog('- bail: previous statment is not an `if`', ifNode.type);
    if (ifNode.test.type !== 'Identifier') return vlog('- bail: the `if` did not test on an identifier');
    if (ifNode.consequent.body.length !== 0) return vlog('- bail: consequent of `if` is not empty'); // TODO
    let alt = ifNode.alternate.body;
    if (alt.length !== 1) return vlog('- bail: alternate does not have exactly one statement'); // TODO
    if (alt[0].type !== 'ExpressionStatement') return vlog('- bail: the alternate did not contain statement expression');
    let assign = alt[0].expression;
    if (assign.type !== 'AssignmentExpression') return vlog('- bail: alt did not contain an assignment expression');
    if (assign.left.type !== 'Identifier') return vlog('- bail: did not assign to the same ident as the while test');
    if (assign.left.name !== whileNode.test.name) return vlog('- bail: the alternate did not update the while test ident');
    if (!AST.isFalse(assign.right)) return vlog('- bail: did not assign a false'); // TODO: can probably support other cases

    // Now confirm that the two bindings (the `if` test and the `while` test) both have one read
    const ifName = ifNode.test.name;
    const whileName = whileNode.test.name;

    const ifMeta = fdata.globallyUniqueNamingRegistry.get(ifName);
    const whileMeta = fdata.globallyUniqueNamingRegistry.get(whileName);

    //if (ifMeta.reads.some(read => !['IfStatement', 'WhileStatement'].includes(read.parentNode.type))) return vlog('- bail: the if-test ident not only read as an if/while test', ifName, ifMeta.reads.length);
    if (whileMeta.reads.some(read => !['IfStatement', 'WhileStatement'].includes(read.parentNode.type))) return vlog('- bail: the while-test was not only read as if/while test', whileName, whileMeta.reads.length);
    //if (whileMeta.writes.length !== 3) return vlog('- bail: the while-test ident was not written to thrice', whileName, whileMeta.writes.length, whileMeta.reads.length, whileMeta.rwOrder.length);
    //if (ifMeta.writes.length !== 1) return vlog('- bail: the if-test ident was not written to twice', ifName, ifMeta.writes.length); // TODO: we can support a wider net but it's tricky to keep it safe

    // So now we have a case like this
    // ```
    // const a = $();
    // const b = true;
    // if (a) {}
    // else b = false;
    // while (b) {
    //   ...
    //   b = false;
    // }
    // ```
    // With any number of writes to a or b, and only read as `if` or `while` test expressions.
    // This means a and b are only consumed as booleans. This means a and b are effectively aliases, whatever the value of a.
    // ```
    // const a = $();
    // const b = true;
    // a = b;
    // while (b) {
    //   ...
    //   b = false;
    // }
    // ```

    rule('A let-if-else-false-while case can be simplified');
    example(
      'let x = $(1); let y = true; if (x) {} else y = false; while (y) { if ($()) y = false; }',
      'let x = $(1); let y = true; y = x; while (y) { if ($()) y = false; }',
    );
    before(whileMeta.writes[0].blockBody[whileMeta.writes[0].blockIndex]);
    before(ifMeta.writes[0].blockBody[ifMeta.writes[0].blockIndex]);
    before(blockBody[blockIndex - 1]);
    before(blockBody[blockIndex]);

    blockBody[blockIndex - 1] = AST.expressionStatement(AST.assignmentExpression(whileName, ifName)); // Replace the `if` with assign

    after(whileMeta.writes[0].blockBody[whileMeta.writes[0].blockIndex]);
    after(ifMeta.writes[0].blockBody[ifMeta.writes[0].blockIndex]);
    after(blockBody[blockIndex - 1]);
    after(blockBody[blockIndex]);

    ++updated;
  }

  return updated;
}
