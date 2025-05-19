// Find try statements and try to move "safe" statements out
// `try { return 100; } catch {}`
// -> `return 100; try {} catch {}`

// TODO: rename to try_hoisting or something

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
import { createFreshVar } from '../bindings.mjs';

export function tryHoisting(fdata) {
  group('\n\n\n[tryHoisting] Looking for statements inside a try that can not throw and hoist them out\n');
  //currentState(fdata, 'tryHoisting', true, fdata);
  const r = _tryHoisting(fdata);
  groupEnd();
  return r;
}
function _tryHoisting(fdata) {
  const ast = fdata.tenkoOutput.ast;

  const queue = [];

  function isExplicitIdent_inefficient(name) {
    if (typeof name !== 'string') {
      if (name.type !== 'Identifier') return false;
      name = name.name;
    }
    if (name === 'arguments') return false; // We might be in global. Too much of an edge case to bother rn.
    const ameta = fdata.globallyUniqueNamingRegistry.get(name);
    return !ameta.isImplicitGlobal;
  }

  function isSafeExpression(node, tryNode) {
    if (AST.isPrimitive(node)) return true;

    switch (node.type) {
      case 'Identifier': {
        return isExplicitIdent_inefficient(node)
      }
      case 'UnaryExpression': {
        return isSafeExpression(node.argument);
      }
      case 'BinaryExpression': {
        const sel = isSafeExpression(node.left);
        const ser = isSafeExpression(node.right);

        if (sel && ser) return true;

        if (node.operator === '===' || node.operator === '!==') {
          // the ===/!== are not observable
          if (sel && isExplicitIdent_inefficient(node.right)) return true;
          if (ser && isExplicitIdent_inefficient(node.left)) return true;
        }

        return false;
      }
      case 'AssignmentExpression': {
        if (node.left.type !== 'Identifier') return false; // member expression may be setter

        // Silly stuff like array/object expressions are ignored for now
        return isSafeExpression(node.right);
      }
      // More TODO
    }

    return false;
  }

  function safeStatement(node, tryNode) {
    // All idents must be explicitly known, since implicit bindings may throw and TDZ errors are untrappable anyways
    // Things that are safe (above in mind);
    // - assignments of (primitives or idents) to idents
    // - assignments of unary expression when the arg is a primitive
    // - assignments of binary expression when both args are primitives
    // - normalized return statements
    // - break/continue statement, same rules as return
    // - throw, same as return, catch must also be empty or missing tho
    // - silly expression statements, but we should not bother with them here
    // - if/while is only okay if none of its descendants can throw (`for` is almost never safe)

    switch (node.type) {
      case 'ExpressionStatement': {
        return isSafeExpression(node.expression);
      }
      case 'VarStatement': {
        // Creating the same binding twice is caught by the parser so only the init may blow this up. Moving the decl
        // outside and before the `try` should not be able to cause problems either.
        return isSafeExpression(node.init);
      }
      case 'ReturnStatement': {
        // This is safe because there is no finally in normalized code
        return isSafeExpression(node.argument);
      }
      // More TODO
    }

    return false;
  }

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'TryStatement') return;

    if (node.block.body.length && safeStatement(node.block.body[0], node)) {
      const blockBody = path.blockBodies[path.blockBodies.length - 1];
      const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];

      queue.push({ index: blockIndex, node, blockBody, blockIndex });
    }
  }

  if (queue.length) {
    vlog('Running queue:', queue.length, 'items');
    queue.sort(({ index: a }, { index: b }) => b - a);
    queue.forEach(({ node, blockBody, blockIndex }) => {
      // Given a try node and its parent body, keep taking the first node away from its block and moving it
      // to be before itself until either the try block is empty or the first statement potentially throws.
      // The first statement should be safe to move already (that's why it's in this queue)

      rule('If a try-statement starts with a statement that cannot throw, move the statement outside of it');
      example('try { return 100; } catch {}', 'return 100; try {} catch {}');
      before(node);

      const offset = blockIndex;
      do {
        blockBody.splice(blockIndex, 0, node.block.body[0]);
        node.block.body.shift();
        ++blockIndex; // Meh. Pick any way of tracking this but make sure to maintain the order.
      } while (node.block.body.length && safeStatement(node.block.body[0], node));

      after(blockBody.slice(offset, blockIndex + 1));
    });

    log('Statements hoisted out of try:', queue.length, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'tryHoisting', changes: queue.length, next: 'phase1'};
  }

  log('Statements hoisted out of try:', 0, '.');
}
