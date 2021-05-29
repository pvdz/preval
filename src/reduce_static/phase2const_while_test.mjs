// Find `while` tests on constant bindings
// Not sure whether this is worth it at all...

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
import { createFreshVar, getIdentUsageKind } from '../bindings.mjs';

export function constWhileTest(fdata) {
  group('\n\n\nFinding `while` tests that are constants\n');
  const r = _constWhileTest(fdata);
  groupEnd();
  return r;
}
function _constWhileTest(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  // TODO: is the walking of individual if statements here more efficient than the gc pressure of collecting all if-statements and their parent etc in phase1 (often redundantly so)?
  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'WhileStatement') return;

    if (node.test.type === 'Identifier') {
      const testName = node.test.name;
      const testMeta = fdata.globallyUniqueNamingRegistry.get(testName);

      if (!testMeta.isConstant) return;

      rule('When the test expression of a `while` is a constant, move the test to an `if` instead');
      example('const x = f(); while (x) {}', 'const x = f(); if (x) while (true) {}');
      before(AST.whileStatement(node.test, AST.blockStatement()));

      const parentNode = path.nodes[path.nodes.length - 2];
      const parentProp = path.props[path.props.length - 1];
      const parentIndex = path.indexes[path.indexes.length - 1];

      const finalNode = AST.ifStatement(node.test, AST.blockStatement(node), AST.blockStatement());

      parentNode[parentProp][parentIndex] = finalNode;
      node.test = AST.tru();

      after(finalNode);
      ++changed;
    }
  }

  if (changed) {
    log('Whiles wrapped in ifs:', changed, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Whiles wrapped in ifs: 0.');
}
