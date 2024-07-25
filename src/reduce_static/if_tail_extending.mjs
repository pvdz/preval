// When one branch of an `if` statement returns early, the tail code should be moved into the other branch.
//
//      if (x) { break; } else { f(); } g();
// ->
//
//      if (x) { break; } else { f(); g(); }

import walk from '../../lib/walk.mjs';
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

export function ifTailExtending(fdata) {
  group('\n\n\nHoisting tails after `if` statements if one branch completes early\n');
  const r = _ifTailExtending(fdata);
  groupEnd();
  return r;
}
function _ifTailExtending(fdata) {
  const ast = fdata.tenkoOutput.ast;

  const queue = [];

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;
    // If one branch always completes while the other doesn't then the tail can be moved into the branch that does not always complete.
    // Note that technically we should already eliminate the tail during DCE when both branches are alwaysCompletes :shrug:
    if (!!node.consequent.$p.alwaysCompletes?.size !== !!node.alternate.$p.alwaysCompletes?.size) {
      const parentNode = path.nodes[path.nodes.length - 2];
      const parentProp = path.props[path.props.length - 1];
      const parentIndex = path.indexes[path.indexes.length - 1];
      ASSERT(parentIndex >= 0);
      // Only queue if there actually is a tail...
      if (parentNode[parentProp].length - 1 > parentIndex) {
        vlog('Queued an `if` (pid=' + node.$p.pid + ') for tail extension');

        queue.push({ pid: +node.$p.pid, contbrk: false, cons: false, node, body: parentNode[parentProp], index: parentIndex });
      }
    } else {
      // Need to check them both... If they both end in continue or break, the remainder will be DCE'd anyways.
      const consEnds = ['BreakStatement', 'ContinueStatement'].includes(node.consequent.body[node.consequent.body.length - 1]?.type);
      const altEnds = ['BreakStatement', 'ContinueStatement'].includes(node.alternate.body[node.alternate.body.length - 1]?.type);

      if (consEnds !== altEnds) {
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const parentIndex = path.indexes[path.indexes.length - 1];
        ASSERT(parentIndex >= 0);
        // Only queue if there actually is a tail...
        if (parentNode[parentProp].length - 1 > parentIndex) {
          vlog('Queued an `if` (pid=' + node.$p.pid + ') for tail extension that had a continue or break at the end of a branch');

          queue.push({ pid: +node.$p.pid, contbrk: true, consEnds, node, body: parentNode[parentProp], index: parentIndex });
        }
      }
    }
  }

  vlog('Found', queue.length, 'if statements that qualify');

  if (queue.length) {
    // Order in reverse order. Later changes won't affect index references of earlier nodes.
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));

    vgroup('Processing ifs now');
    queue.forEach(({ contbrk, consEnds, node, body, index }) => {
      if (contbrk) {
        vlog('Next if:', node.$p.pid, ', breaks or continues: in the', consEnds ? 'if' : 'else', 'branch');
        if (consEnds) {
          // Only the if-branch ended with a `continue` or `break` statement.
          rule('The `if` branch has `continue` or `break`, move the tail into the `else` branch');
          example('if (x) { break; } else { f(); } g();', 'if (x) { break; } else { f(); g(); }');
          before(body.slice(index));

          // Move all statements that follow the `if` in the same block as the `if` into the branch that does not complete early
          node.alternate.body.push(...body.slice(index + 1));
          body.length = index + 1;

          after(body.slice(index));
        } else {
          // Only the else-branch ended with a `continue` or `break` statement.
          rule('The `else` branch has `continue` or `break`, move the tail into the `if` branch');
          example('if (x) { f(); } else { continue; } g();', 'if (x) { f(); g(); } else { continue; }');
          before(body.slice(index));

          // Move all statements that follow the `if` in the same block as the `if` into the branch that does not complete early
          node.consequent.body.push(...body.slice(index + 1));
          body.length = index + 1;

          after(body.slice(index));
        }
      } else {
        vlog('Next if:', node.$p.pid, ', completes early:', node.consequent.$p.alwaysCompletes?.size, ':', node.alternate.$p.alwaysCompletes?.size);

        rule('If either `if` branch has an early complete, move the tail into the other branch');
        example('if (x) { return; } else { f(); } g();', 'if (x) { return; } else { f(); g(); }');
        before(body.slice(index));

        // Move all statements that follow the `if` in the same block as the `if` into the branch that does not complete early
        if (node.consequent.$p.alwaysCompletes?.size) {
          node.alternate.body.push(...body.slice(index + 1));
        } else {
          node.consequent.body.push(...body.slice(index + 1));
        }
        body.length = index + 1;

        after(body.slice(index));
      }
    });
    vgroupEnd();

    if (queue.length) {
      log('Extended branches:', queue.length, '. Restarting from phase1');
      return 'phase1';
    }
  }

  log('Extended branches: 0.');
}
