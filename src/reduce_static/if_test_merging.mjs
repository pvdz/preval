// Find If statements where the first statement of each branch is equal. In that case hoist them.
// Bonus: if the statement is only equal except for boolean literals then leverage the test expression to achieve the same.
//
//        if (x) a = true; else a = false;
// ->
//        a = x; if (x) ; else ;
//
// Boolean case:
//
//        if (x) a = true; else a = false;
// ->
//        const b = Boolean(x); a = b; if (x) ; else ;
//
// Boolean invert case:
//
//        if (x) a = true; else a = false;
// ->
//        const b = !x; a = b; if (x) ; else ;

// TODO: retain TDZ semantics

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { isSameFlatStatementExceptBool } from '../utils/is_same_except_bool.mjs';
import { createFreshVar } from '../bindings.mjs';

export function ifTestMerging(fdata) {
  group('\n\n\nFinding ifs with bool tests that can hoist statements\n');
  const r = _ifTestMerging(fdata);
  groupEnd();
  return r;
}
function _ifTestMerging(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'IfStatement') return;
    if (!node.consequent.body.length || !node.alternate.body.length) return;
    if (node.test.type !== 'Identifier') return; // Whatever else it is, I don't care about it. Either it gets inlined or it's irrelevant.

    const firstThen = node.consequent.body[0];
    const firstElse = node.alternate.body[0];

    // Confirm that this is not an assignment that mutates the `if` test value. There's a test case.
    if (
      node.test.type === 'Identifier' &&
      firstThen.type === 'ExpressionStatement' &&
      firstThen.expression.type === 'AssignmentExpression' &&
      firstThen.expression.left.type === 'Identifier' &&
      firstThen.expression.left.name === node.test.name
    ) {
      // Catches this case:
      // `let x = $(); while (true) if (x) x = 1; else x = 1;`
      // When the statement is mutating the if-test itself it may change the outcome which it shouldn't be doing.

      vlog('- Bail: statement is mutating the test value');
      return;
    }

    /** @var {Array<{a:Node, b:Node, ap: Array<Node>, bp: Array<Node>, prop: string|number}>} */
    const collect = []; // Capture the occurrences of mismatching bools
    if (!isSameFlatStatementExceptBool(firstThen, firstElse, collect)) return;

    vlog('The `if` statement @', +node.$p.pid, 'has a consequent and alternate branch that start with the same statement, ignoring bools. Deduping them to before the If now.');
    vlog('Collected mismatches:', collect.map(({a,b,ap, bp, prop}) => `${ap.type || 'array'}[${prop}]=${a.raw}/${b.raw}`));

    const pathNodes = path.nodes;
    const pathProps = path.props;
    const pathIndexes = path.indexes;

    const parentNode = pathNodes[pathNodes.length - 2];
    const parentProp = pathProps[pathProps.length - 1];
    const parentIndex = pathIndexes[pathIndexes.length - 1];

    rule('When both branches of an If start with the same statement except for true/false cases, merge them to before the If with a Boolean(test)');
    example('if (x) { f(true); p; } else { f(false); q; }', 'const b = Boolean(x); f(b); if (x) { p } else { q }');
    example('if (x) { f(false); p; } else { f(true); q; }', 'const b = !x; f(b); if (x) { p } else { q }');
    before(parentNode.body[parentIndex], node);

    // Now move consequent statement[0] to before the If, remove the first statements from each branch. Replace all collected occurrences in A with the test.
    parentNode.body.splice(parentIndex, 0, node.consequent.body.shift());
    node.alternate.body.shift();

    if (collect.length) {
      const needInverse = collect.some(({a}) => a.value === false);
      const tmpName = createFreshVar('tmpBool', fdata);
      const tmpNode = AST.variableDeclaration(tmpName,
        needInverse
          ? AST.unaryExpression('!', AST.identifier(node.test.name))
          : AST.callExpression('Boolean', [AST.identifier(node.test.name)])
      );
      parentNode.body.splice(parentIndex, 0, tmpNode);
      collect.forEach(({ap, prop}) => {
        ap[prop] = AST.identifier(tmpName);
      });
    }

    if (firstThen.type === 'VariableDeclaration') {
      const nameA = firstThen.declarations[0].id.name;
      const nameB = firstElse.declarations[0].id.name;
      const meta = fdata.globallyUniqueNamingRegistry.get(nameB);
      vgroup('Updating the refs of the second var binding to refer to the name of the first', [nameA], [nameB]);
      meta.rwOrder.forEach(ref => {
        before(ref.grandNode);
        ref.node.name = nameA;
        after(ref.grandNode);
      });
      vgroupEnd();
      vlog('Updated');
    }

    after(parentNode.body[parentIndex]);
    after(parentNode.body[parentIndex+1], node);
    ++changed;
  }

  if (changed) {
    log('If bool test statements merged:', changed, '. Restarting from phase1');
    return {what: 'ifTestMerging', changes: changed, next: 'phase1'};
  }

  log('If bool test statements merged: 0.');
}
