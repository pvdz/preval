// Find loops that have a `while (true)` and try to unroll them by copying their
// body before the loop and replacing the `true` with a counter instead.
//
// `while (true) { if ($()) break; }`
// -->
//   let $loopCounter = 100; // special counter, recognized
//   start: {
//     if ($()) {
//       $loopCounter = 0;
//       break start; // ugly, do we have a better way of achieving this?
//     }
//   }
//   while ($loopCounter--> 0) {
//     if ($()) break;
//   }
//
// The trick is to prevent doing this multiple times, while also preventing rules
// from thinking the loop can be eliminated once the counter reaches zero, because
// it would then eliminate the loop prematurely which can lead to bad results.
// The counter will have to persist and be special cased. We could make it an
// implicit global and track it superficially, injecting it only when serializing
// it. It does need to be local to the loop (consider invoking a function with an
// infinite loop multiple times).
// The block wrapper is necessary to safeguard against creating local variables
// multiple times etc.
// The clone would have to take care of some cases:
// - Break: clear the counter, skip the remainder of the copied block
// - Labels: must be unique so that needs to be traversed and updated to ensure
//   uniqueness. We may just bail on labels for now.
// - Labeled break: ummm. Bail.
// - Nested loops: not a problem except that the counter logic would need to be robust
// I think other constructs like try/catch, return, throw, etc, are all ok...

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import {createFreshVar} from '../bindings.mjs';
import { deepCloneForFuncInlining, labeledStatement, updateExpression } from '../ast.mjs';
import {MAX_UNROLL_TRUE_COUNT} from "../globals.mjs"
import { createFreshLabelStatement } from '../labels.mjs';

export function unrollLoopWithTrue(fdata, unrollTrueLimit = 10) {
  group('\n\n\nChecking for while loops with true to unroll (limit =' , unrollTrueLimit, ')');
  ASSERT(typeof unrollTrueLimit === 'number' && unrollTrueLimit > 0, 'should have a unrollTrueLimit', unrollTrueLimit);
  if (unrollTrueLimit > MAX_UNROLL_TRUE_COUNT) {
    throw new Error('unrollLoopWithTrue; The unrollTrueLimit (' + unrollTrueLimit + ') is bigger than the hardcoded max MAX_UNROLL_TRUE_COUNT of ' + MAX_UNROLL_TRUE_COUNT);
  }

  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _unrollLoopWithTrue(fdata, unrollTrueLimit);
  groupEnd();
  return r;
}
function _unrollLoopWithTrue(fdata, unrollTrueLimit) {
  let updated = processAttempt(fdata, unrollTrueLimit);

  log('');
  if (updated) {
    log('True loops unrolled:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'unrollLoopWithTrue', changes: updated, next: 'normal'};
  }
  log('True loops unrolled: 0.');
}

function processAttempt(fdata, unrollTrueLimit) {
  if (!(unrollTrueLimit > 0)) {
    log('The unroll limit is not greater than zero, bailing', unrollTrueLimit);
  }
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
    if (whileNode.test.type === 'Identifier' && whileNode.test.name === '$LOOP_DONE_UNROLLING_ALWAYS_TRUE') return;

    const isWhileTrue =
      AST.isTrue(whileNode.test) ||
      (
        whileNode.test.type === 'Identifier' &&
        whileNode.test.name.startsWith('$LOOP_UNROLL_')
      );
    ASSERT(isWhileTrue, 'all whiles must be normalized to while(true) (in some form) at this point', whileNode.test);

    if (
      whileNode.test.type === 'Identifier' &&
      whileNode.test.name.startsWith('$LOOP_UNROLL_') &&
      (path.nodes[path.nodes.length - 3]?.type === 'IfStatement')
    ) {
      // Technically we don't need this check but it leads to a significant uptick in code bloat so for now we're keeping this check
      return;
    }

    vlog('- while @', whileNode.$p.pid);

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

    ASSERT(parentNode.type !== 'LabeledStatement', 'normalized code wont have this');

    // Scan body and confirm that it does not contain labeled continue/break
    // statements and no labeled statements.

    let ok = true;
    walk(confirmWalk, whileNode.body, 'ast');
    function confirmWalk(node, beforeWalk, nodeType, path) {
      if (!beforeWalk) {
        return;
      }
      if (node.type === 'LabeledStatement') {
        ok = false;
        vlog('  - bail: body contained a label');
        return true; // Do not enter
      }
      if (node.type === 'BreakStatement' && node.label !== null) {
        ok = false;
        vlog('  - bail: body contained labeled break');
        return;
      }

      // Don't unroll nested loops. That just risks too much code growth
      if (node.type === 'WhileStatement') {
        ok = false;
        vlog('  - bail: body contained another loop and we will deal with that another day, or never');
        return true; // Do not enter
      }

      // TODO: improve this. For now skip some of the gnarly bits for cloning. Our target does not contain these.
      if (['FunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        ok = false;
        vlog('  - bail: body contained function');
        return true; // Do not enter
      }

      if (!ok) {
        return ok; // Do not enter. We have our answer but we have no better way of stopping the walk.
      }
    }
    if (!ok) {
      vlog('  - bail: body contained something bad');
      return;
    }

    // This should be fine. First clone the while body

    vlog('Going try to unroll this loop 10x');

    // In theory we can do this multiple times. In practice it makes certain heavy cases much worse. To be further investigated.
    for (let i=0; i<1; ++i) {
      if (whileNode.test.name === '$LOOP_DONE_UNROLLING_ALWAYS_TRUE') break;

      vlog('Attempting to clone loop body...')

      const fail = {};
      const clone = deepCloneForFuncInlining(whileNode.body, new Map, fail);
      if (fail.ed) {
        vlog('  - bail: body cloning failed', fail);
        return;
      }

      vlog('Clone successful. Now replacing unlabeled breaks that target this loop.');

      // Next do preliminary work on the clone to replace the break/continue

      const labelStatementNode = createFreshLabelStatement('loopStop', fdata, AST.blockStatement(clone, blockBody[blockIndex]));

      const condCount = AST.isTrue(whileNode.test) ? unrollTrueLimit - 1 : parseInt(whileNode.test.name.slice('$LOOP_UNROLL_'.length), 10) - 1;
      const condIdent = condCount > 0 ? '$LOOP_UNROLL_' + condCount : ('$LOOP_DONE_UNROLLING_ALWAYS_TRUE');

      const walker = function replacer(node, beforeWalk, nodeType, path) {
        if (beforeWalk) {
          return;
        }

        if (node.type === 'BreakStatement') {
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];

          // Note: we ignore nested loops here so don't worry about checking the break target

          rule('While unrolling, cloned unlabeled breaks that were targeting the while scope should get a label and disable the loop var');
          example('while (true) { break; }', 'while (true) { unrollCheck = false; break loopStop; }');
          before(parentNode[parentProp][parentIndex]);

          // Break is already asserted to not have a label
          const newNode = AST.blockStatement([
            AST.breakStatement(labelStatementNode.label.name),
          ])

          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;

          after(newNode);
        }
      };
      walk(walker, clone, 'BlockStatement');

      vlog('And finally insert the cloned body and wrap the whole thing in a label');

      rule('while(true) with any one break or only simple breaks should be unrolled');
      example(
        'while (true) { if ($()) break; }',
        //'{ let tmp = $LOOP_COUNTER_1000; stop: { if ($()) { tmp = false; break stop; } } while (tmp) { if ($()) break; }'
        //'{ let tmp = true; stop: if ($()) { tmp = false; break stop; } if (tmp) { while ($LOOP_COUNTER_999) { if ($()) break; } }'
        'loopStop: { if ($()) { break loopStop; } else { while ($LOOP_COUNTER_999) { if ($()) break loopStop; } }'
      );

      before(whileNode, parentNode);

      vlog('Counter:', condCount, ', ident:', condIdent, ', whileNode.test.name:', whileNode.test.type, whileNode.test.name);
      whileNode.test = AST.identifier(condIdent);
      blockBody[blockIndex] = labelStatementNode;

      after(labelStatementNode, parentNode);
    }

    ++updated;
  }

  return updated;
}
