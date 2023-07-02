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
// - Continue: keep the counter, skip the remainder of the copied block (let it enter
//   the loop naturally)
// - Labels: must be unique so that needs to be traversed and updated to ensure
//   uniqueness. We may just bail on labels for now.
// - Labeled continue/break: ummm. Bail.
// - Nested loops: not a problem except that the counter logic would need to be robust
// I think other constructs like try/catch, return, throw, switch, etc, are all ok...

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import {createFreshLabel, createFreshVar} from '../bindings.mjs';
import {deepCloneForFuncInlining, updateExpression} from "../ast.mjs"
import {MAX_UNROLL_TRUE_COUNT} from "../globals.mjs"

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
    return 'restart';
  }
  log('True loops unrolled: 0.');
}

function processAttempt(fdata, unrollTrueLimit) {
  let updated = 0;

  // We're looking for `while` whose test condition is `true`
  // We need to copy its body and prepend it in a block
  // The copy needs to have break, continue. We bail if it has labels or labeled continue/break.
  // Limits: maybe size of body should be capped/configurable. Counter should be configurable.

  const ast = fdata.tenkoOutput.ast;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return; // Go from inner to outer...?
    if (updated) return; // TODO: allow to do this for multiple loops in the same iteration as long as they're not nested

    // Either look for `true`, or for previous cases to limit it
    // In case of the constant, check that the parent node is not an `if` with only this `while` as its child statement.
    // It's an attempt to not keep unrolling. And it may go off the rails.
    if (node.type === 'WhileStatement' && (
      AST.isTrue(node.test) ||
      (
        node.test.type === 'Identifier' &&
        node.test.name.startsWith('$LOOP_UNROLL_') &&
        (path.nodes[path.nodes.length - 3]?.type !== 'IfStatement')
      )
      // Detecting this other pattern will work but also breaks a bunch of rules so we have to be careful about it
      //||
      //(
      //  node.test.type === 'Identifier' &&
      //  //fdata.globallyUniqueNamingRegistry.get(node.test.name).typing.mustBeValue === true
      //  node.test.name === 'tmpIfTest'
      //)
    )) {
      vlog('- while @', node.$p.pid);

      // Skip if parent node is a label, because we don't want to deal with that complexity right now.
      const parentNode = path.nodes[path.nodes.length - 2];
      const parentProp = path.props[path.props.length - 1];
      const parentIndex = path.indexes[path.indexes.length - 1];
      if (parentNode.type === 'LabeledStatement') {
        vlog('  - bail: while is labeled');
        return;
      }

      // Scan body and confirm that it does not contain labeled continue/break
      // statements and no labeled statements.

      let ok = true;
      walk(confirmWalk, node.body, 'ast');
      function confirmWalk(node, beforeWalk, nodeType, path) {
        if (!beforeWalk) {
          return;
        }
        if (node.type === 'LabeledStatement') {
          ok = false;
          vlog('  - bail: body contained a label');
          return;
        }
        if ((node.type === 'ContinueStatement' || node.type === 'BreakStatement') && node.label !== null) {
          ok = false;
          vlog('  - bail: body contained labeled continue/break');
          return;
        }

        // TODO: for now, ignore loops so we don't have to worry about scoping of break/continue ;)
        if (['ForOfStatement', 'ForInStatement', 'ForStatement', 'WhileStatement'].includes(node.type)) {
          ok = false;
          vlog('  - bail: body contained another loop and we will deal with that another day, or never');
          return;
        }

        // TODO: improve this. For now skip some of the gnarly bits for cloning. Our target does not contain these.
        if (['FunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
          ok = false;
          vlog('  - bail: body contained function');
          return;
        }
      }
      if (!ok) {
        vlog('  - bail: body contained something bad');
        return;
      }

      // This should be fine. Clone it.
      // TODO: do I actually need to clone anything if I'm just going to restart anyways?
      const fail = {};
      const clone = deepCloneForFuncInlining(node.body, new Map, fail);
      if (fail.ed) {
        vlog('  - bail: body cloning failed', fail);
        return;
      }

      rule('while(true) should be unrolled');
      example('while (true) { if ($()) break; }', '{ let tmp = true; stop: { if ($()) { tmp = false; break stop; } if (tmp) { while ($LOOP_COUNTER_999) { if ($()) break; } }')
      before(node, parentNode);

      const tmpName = createFreshVar('$tmpLoopUnrollCheck', fdata);
      const tmpLabel = createFreshLabel('loopStop', fdata);

      walk(replacer, clone, 'BlockStatement');
      function replacer(node, beforeWalk, nodeType, path) {
        if (beforeWalk) {
          return;
        }

        if (node.type === 'BreakStatement') {
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];

          const newNode = AST.blockStatement([
            AST.expressionStatement(AST.assignmentExpression(tmpName, AST.fals(), '=')),
            AST.breakStatement(tmpLabel.name),
          ])

          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;

          return;
        }

        if (node.type === 'ContinueStatement') {
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];

          const newNode = AST.blockStatement([
            AST.breakStatement(tmpLabel.name),
          ])

          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;

          return;
        }
      }

      const condCount = AST.isTrue(node.test) ? unrollTrueLimit : parseInt(node.test.name.slice('$LOOP_UNROLL_'.length), 10) - 1;
      const condIdent = condCount > 0 ? '$LOOP_UNROLL_' + condCount : ('$LOOP_DONE_UNROLLING_ALWAYS_TRUE');
      //console.log('count at', condCount, ', condIdent =', condIdent);

      const newNodes = AST.blockStatement([
        AST.variableDeclaration(tmpName, AST.tru(), 'let'),
        AST.labeledStatement(tmpLabel.name, clone),
        AST.ifStatement(
          tmpName,
          AST.whileStatement(
            AST.identifier(condIdent),
            AST.blockStatement([
              node.body,
            ]),
          ),
          AST.blockStatement([])
        ),
      ]);

      if (parentIndex < 0) parentNode[parentProp] = newNodes;
      else parentNode[parentProp][parentIndex] = newNodes;

      after(newNodes, parentNode);

      //console.log('Checking for while loops with true to unroll');
      //console.log(tmat(ast, true));

      //throw new Error('checm')

      ++updated;
    }
  }

  return updated;
}
