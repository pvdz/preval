// Find loops that never loop and drop them if we can

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
import { createFreshLabel, createFreshVar } from '../bindings.mjs';

export function fakeLoops(fdata) {
  group('\n\n\nFind loops that never loop and drop them if we can\n');
  const r = _fakeLoops(fdata);
  groupEnd();
  return r;
}
function _fakeLoops(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  const loopStack = [];

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    // Track while loops
    // Track breaks and continues, maybe throws and returns and try too.
    // If the loop loops then all bets are off
    // If the loop does not loop and there is no try or continue, remove the loop and if the break has no label also the break

    //vlog('Walking:', nodeType, loopStack.length);

    if (nodeType === 'WhileStatement') {
      if (beforeWalk) {
        loopStack.push({
          breaks: [],
          others: false, // do I care?
          bail: false, // try, continue, labeled break (?)
        });
      } else {
        const obj = loopStack.pop();
        if (!obj.bail) {
          // Transform the loop to a conditional labeled break. This maintains normalized form and breakage semantics.
          rule('A while loop that never loops can be eliminated');
          example('while (x) { f(); break; }', ' if (x) { oldLoop: { f(); break oldLoop; } }');
          before(node);

          const whileTest = node.test;
          const whileBlock = node.body;
          ASSERT(whileTest, 'while test?', whileTest, node);
          ASSERT(whileBlock.type === 'BlockStatement', 'body is a block', whileBlock, node);
          // We can keep pretty much all the structure and swap them out in place, maintaining normalization
          const tmpLabelIdentNode = createFreshLabel('tmpWhile', fdata);
          // Slap a label on those breaks. Other rules will sort out whether they are redundant or whatever.
          obj.breaks.forEach((node) => {
            // If the loop had a labeled statement then it would bail based on that. But we're here, so no label.
            // If the break has a label then it must break past the current loop so don't change the label
            if (node.label) {
              vlog('Break has label so not changing it...');
            } else {
              node.label = AST.identifier(tmpLabelIdentNode.name);
            }
          });
          // Swap out the loop statement for a label statement. No need to revisit it. Even in a nested loop.
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];
          parentNode[parentProp][parentIndex] = AST.ifStatement(
            whileTest,
            AST.blockStatement(AST.labeledStatement(tmpLabelIdentNode, whileBlock)),
            AST.blockStatement(),
          );

          after(parentNode[parentProp][parentIndex]);
          ++changed;
        }
      }
    }
    else if (nodeType === 'ForInStatement' || nodeType === 'ForOfStatement') {
      // Note: a for-x statement can't be eliminated because the loop might trigger getters and we can't predict which one
      // So even if we can collapse a loop, we can at best simplify it to `for (x in y) { break }` ("minimal form")
      if (beforeWalk) {
        loopStack.push({
          breaks: [],
          others: false, // do I care?
          bail:
            node.body.body.length === 0 ||
            // cant eliminate the "minimal form"
            (node.body.body.length === 1 && node.body.body[0].type === 'BreakStatement') ||
            // cant eliminate the "minimal ran form", where the first statement is an assignment expression and the second a break
            (node.body.body.length === 2 &&
              node.body.body[0].type === 'ExpressionStatement' &&
              node.body.body[0].expression.type === 'AssignmentExpression' &&
              node.body.body[1].type === 'BreakStatement'),
        });
      } else {
        loopStack.pop();
      }
    }
    else if (nodeType === 'FunctionExpression') {
      // Add a layer that we won't use
      if (loopStack.length) {
        if (beforeWalk) {
          // This will be ignored
          loopStack.push({ breaks: [], others: false, bail: false });
        } else {
          loopStack.pop();
        }
      }
    } else if (beforeWalk && loopStack.length && loopStack[loopStack.length - 1]?.type === 'WhileStatement') {
      //vlog('Inside a loop, node:', nodeType);
      if (nodeType === 'BlockStatement') {
        // This is also the block for each branch of the `if` and the loop itself
        if (!node.body.length || !['ReturnStatement', 'ThrowStatement', 'BreakStatement'].includes(node.body[node.body.length - 1].type)) {
          loopStack[loopStack.length - 1].bail = true;
        }
      } else if ('BreakStatement' === nodeType) {
        vlog('- break inside a loop');
        // If the loop had no label then a labeled break must still go through the label so we can accept it, right?
        //if (node.label) {
        //   We don't know whether the break goes through the loop or not so we just bail for now
        //loopStack[loopStack.length - 1].bail = true;
        //} else {
        loopStack[loopStack.length - 1].breaks.push(node);
        //}
      } else if (['ContinueStatement', 'TryStatement', 'LabeledStatement'].includes(nodeType)) {
        vlog('- bail inside a loop');
        loopStack[loopStack.length - 1].bail = true;
      }
    }
  }

  if (changed) {
    log('Fake loops dropped:', changed, '. Restarting from phase1');
    return 'phase1';
  }

  log('Fake loops dropped: 0.');
}
