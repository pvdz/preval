// Find `if` statements where each branch starts with the same-ish node
//
//        if (x) a = y; else a = y;
// ->
//        a = y; if (x) ; else ;`

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

export function ifReduceUp(fdata) {
  group('\n\n\nFinding ifs with branches that start the same\n');
  const r = _ifReduceUp(fdata);
  groupEnd();
  return r;
}
function _ifReduceUp(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let queue = [];

  function almostIdentical(a, b) {
    // Two nodes are almost identical when either they are a var with identical init, or they are identical.
    // For the var case, the id can be different. Caller should be aware of this.

    if (a.type !== b.type) return false;

    if (a.type === 'VariableDeclaration') return almostIdentical(a.declarations[0].init, b.declarations[0].init);

    // Laaaaazy. But why not.
    return tmat(a, true) === tmat(b, true);
  }

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;
    if (!node.consequent.body.length || !node.alternate.body.length) return;

    const firstThen = node.consequent.body[0];
    const firstElse = node.alternate.body[0];

    if (!almostIdentical(firstThen, firstElse)) return;

    const blockBody = path.blockBodies[path.blockBodies.length - 1];
    const blockIndex = path.blockIndexes[path.blockIndexes.length - 1];
    ASSERT(blockBody instanceof Array, 'block body is array?', blockBody);
    ASSERT(blockBody[blockIndex] === node, 'thats the point of blockBody/blockIndex', blockIndex, path.blockIndexes, node.type);

    // We should now be able to hoist the statement up.
    // The if-test is noramlized and so it cannot spy
    // The edge case is a var statement, since we have to rename all occurrences of the variable

    if (firstThen.type === 'VariableDeclaration') {
      // Find the meta for one of them. Replace the name of all refs with the name of the other binding. Drop the var decl.
      queue.push({
        pid: +node.$p.pid,
        func: () => {
          rule('When each branch of an `if` starts with the same expression, hoist them up');
          example('if (x) { let a = 1; f(a); } else { let b = 1; g(b); }', 'let a = 1; if (x) f(a); else g(a);');
          before(node);

          const name = firstThen.declarations[0].id.name;
          const meta = fdata.globallyUniqueNamingRegistry.get(firstElse.declarations[0].id.name);
          meta.rwOrder.forEach((ref) => {
            if (ref.action === 'write' && ref.kind === 'var') {
              // Ignore the var. We'll drop it next.
            } else {
              ref.node.name = name;
            }
          });

          blockBody.splice(blockIndex, 0, firstThen);
          node.consequent.body.shift();
          node.alternate.body.shift();

          after(node);
        },
      });
    } else {
      queue.push({
        pid: +node.$p.pid,
        func: () => {
          rule('When each branch of an `if` starts with the same expression, hoist them up');
          example('if (x) { a = 1; f(a); } else { a = 1; g(a); }', 'a = 1; if (x) { f(a); } else { g(a); }');
          before(node);

          if (firstThen.type === 'ReturnStatement' || firstThen.type === 'BreakStatement' || firstThen.type === 'ThrowStatement') {
            // Preserve if-test expression
            blockBody.splice(blockIndex, 0, firstThen);
            blockBody.splice(blockIndex, 0, AST.expressionStatement(AST.cloneSimple(node.test)));
          } else {
            blockBody.splice(blockIndex, 0, firstThen);
          }

          node.consequent.body.shift();
          node.alternate.body.shift();

          after(firstThen);
          after(node);
        },
      });
    }
  }

  if (queue.length) {
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ func }) => func());

    log('Branch starts lifted:', queue.length, '. Restarting from phase1');
    return {what: 'ifReduceUp', changes: queue.length, next: 'phase1'};
  }

  log('Branch starts lifted: 0.');
}
