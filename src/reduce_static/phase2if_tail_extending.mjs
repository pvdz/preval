// When one branch of an `if` statement returns early, the tail code should be moved into the other branch.

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

  let tailed = 0;

  const queue = [];

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;
    // If one branch always complets while the other doesn't then the tail can be moved into the branch that does not always complete.
    // Note that technically we should already eliminate the tail during DCE when both branches are alwaysComplete :shrug:
    if (!!node.consequent.$p.alwaysComplete !== !!node.alternate.$p.alwaysComplete) {
      const parentNode = path.nodes[path.nodes.length - 2];
      const parentProp = path.props[path.props.length - 1];
      const parentIndex = path.indexes[path.indexes.length - 1];
      ASSERT(parentIndex >= 0);
      // Only queue if there actually is a tail...
      if (parentNode[parentProp].length - 1 > parentIndex) {
        vlog('Queued an `if` (pid=' + node.$p.pid + ') for tail extension');

        queue.push({ pid: +node.$p.pid, node, body: parentNode[parentProp], index: parentIndex });
      }
    }
  }

  vlog('Found', queue.length, 'if statements that qualify');

  if (queue.length) {
    // Order in reverse order. Later changes won't affect index references of earlier nodes.
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));

    vgroup('Processing ifs now');
    queue.forEach(({ node, body, index }) => {
      vlog('Next if:', node.$p.pid, ', completes early:', node.consequent.$p.alwaysComplete, ':', node.alternate.$p.alwaysComplete);

      rule('If either `if` branch has an early complete, move the tail into the other branch');
      example('if (x) { return; } else { f(); } g();', 'if (x) { return; } else { f(); g(); }');
      before(body.slice(index));

      // Move all statements that follow the `if` in the same block as the `if` into the branch that does not complete early
      if (node.consequent.$p.alwaysComplete) {
        node.alternate.body.push(...body.slice(index + 1));
      } else {
        node.consequent.body.push(...body.slice(index + 1));
      }
      body.length = index + 1;

      after(body.slice(index));
    });
    vgroupEnd();

    if (queue.length) {
      log('Extended branches:', queue.length, '. Restarting from phase1');
      return 'phase1';
    }
  }

  log('Extended branches: 0.');
}
