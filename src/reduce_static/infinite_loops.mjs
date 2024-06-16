// Find loops that never break and compile a `throw "unreachable"` after them to induce DCE
// And if a loop (`while(true)`) always completes then eliminate it.

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
import * as AST from '../ast.mjs';
import { addLabelReference, createFreshLabelStatement } from '../labels.mjs';

export function infiniteLoops(fdata) {
  group('\n\n\nFind loops that always loop and add a "throw unreachable" after them\n');
  const r = _infiniteLoops(fdata);
  groupEnd();
  return r;
}
function _infiniteLoops(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  const loopStack = [];
  const labelStack = [];

  /** @var {Array<{index: number, func: () => void}>} */
  const queue = [];

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    // Track while loops
    // Track breaks and continues, maybe throws and returns and try too.
    // If the loop loops then all bets are off
    // If the loop does not loop and there is no try or continue, remove the loop and if the break has no label also the break

    switch (nodeType + ':' + (beforeWalk ? 'before' : 'after')) {
      case 'ForInStatement:before':
      case 'ForOfStatement:before':
      case 'WhileStatement:before': {
        loopStack.push(node);
        node.$p.fakeLoopStuff = [];
        break;
      }
      case 'ForInStatement:after':
      case 'ForOfStatement:after': {
        loopStack.pop(node);
        break;
      }
      case 'WhileStatement:after': {
        loopStack.pop(node);
        if (node.$p.fakeLoopStuff.length === 0) {
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];
          if ((parentNode.type === 'BlockStatement' || parentNode.type === 'Program') && parentProp === 'body' && parentNode.body[parentIndex + 1]?.type !== 'ThrowStatement') {
            queue.push({
              index: parentIndex,
              func: () => {
                rule('A loop that never stops should get a throw after it');
                example('while (true) { f(); } g();', 'while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) { f(); } throw "unreachable"; g();');
                before(parentNode);

                parentNode.body.splice(parentIndex + 1, 0, AST.throwStatement(AST.primitive('[preval] unreachable; infinite loop')));
                // Prevent unrolling the loop: I think there's no real point as it can't ever eliminate or prevent the loop itself..
                node.test = AST.identifier('$LOOP_DONE_UNROLLING_ALWAYS_TRUE');

                after(parentNode);
              }
            });
            ++changed;
          }
        }

        if (node.body.$p.alwaysComplete) {
          // This loop always breaks, returns, or throws.
          // That means it can never loop. That means we can eliminate the while and replace it with its body...

          rule('A loop that never loops can be replaced with its body');
          example('while (true) { f(); throw x; }', '{ f(); throw x; }');
          before(node);

          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];

          parentNode[parentProp][parentIndex] = node.body;
          queue.push({index: parentIndex, func: () => {
            parentNode[parentProp].splice(parentIndex, 1, ...node.body.body);
          }});

          after(parentNode[parentProp][parentIndex]);
          ++changed;
        }
        break;
      }
      case 'BreakStatement:before': {
        const breakNode = node;
        if (breakNode.label) {
          const label = breakNode.label.name;
          for (const labelNode of labelStack) {
            if (labelNode.label.name === label) {
              let index = loopStack.length - 1;
              while (index >= 0 && loopStack[index].$p.pid > +labelNode.$p.pid) {
                loopStack[index].$p.fakeLoopStuff.push(breakNode);
                --index;
              }

              break;
            }
          }
        } else {
          loopStack[loopStack.length - 1]?.$p.fakeLoopStuff.push(node);
        }
        break;
      }
      //case 'ThrowStatement:before': {
      //  loopStack[loopStack.length - 1]?.$p.fakeLoopStuff.push(node);
      //  break;
      //}
      //case 'ReturnStatement:before': {
      //  loopStack[loopStack.length - 1]?.$p.fakeLoopStuff.push(node);
      //  break;
      //}
      case 'LabeledStatement:before': {
        labelStack.push(node);
        break;
      }
      case 'LabeledStatement:after': {
        labelStack.pop();
        break;
      }
    }
  }

  if (changed) {
    vgroup('Unrolling call queue now:');

    queue.sort(({ index: a }, { index: b }) => b-a);
    queue.forEach(({ index, func }) => {
      ASSERT(typeof index === 'number', 'must queue a number...', index);
      func()
    });

    vgroupEnd();

    log('Infinite loops found:', changed, '. Restarting from phase1');
    return 'phase1';
  }

  log('Fake loops dropped: 0.');
}