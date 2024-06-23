// Find labels that are preceded by a var decl where that var is only used inside the label block
// In that case the var decl can be moved inside the label, which may appease certain heuristics.
//
//    `const x = f(); A: { ...; g(x); }`
// -> `A: { const x = f(); ...; g(x); }`
//

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, riskyRule, } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function labelScoping(fdata) {
  group('\n\n\nFinding var decls to get scoped up by labels\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _labelScoping(fdata);
  groupEnd();
  return r;
}
function _labelScoping(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'LabeledStatement') return;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    if (parentIndex === 0) return;
    const vardecl = parentNode[parentProp][parentIndex - 1];
    if (vardecl.type !== 'VariableDeclaration') return;

    // Ok. We have the pattern, now verify that the decl is not used after the label.
    // We can simply check the blockChain property for this.

    const varName = vardecl.declarations[0].id.name;
    const meta = fdata.globallyUniqueNamingRegistry.get(varName);

    if (!meta.singleScoped) return;

    // Block chain is the chain of block pid's from current node all the way to Program
    // If one blockChain is a prefix of the other than the one is in a block that is some ancestor of the other
    const lastRefBlockChain = meta.rwOrder[meta.rwOrder.length - 1].node.$p.blockChain;
    const labelBlockChain = node.body.body.length && node.body.body[0].$p.blockChain;
    vlog('label block:', labelBlockChain, ', lastref:', lastRefBlockChain);
    if (!lastRefBlockChain.startsWith(labelBlockChain)) return;

    // Should be good to go
    rule('If a var decl declared before a label is only used inside the label then the decl can be moved inside the label');
    example('const x = f(); A: { $(x); }', 'A: { const x = f(); $(x); }');
    before(parentNode[parentProp]);

    node.body.body.unshift(vardecl);
    parentNode[parentProp][parentIndex - 1] = AST.emptyStatement();

    after(parentNode[parentProp]);
    ++changes;
  }

  if (changes) {
    log('Var decls wrapped by label:', changes, '. Restarting from phase1');
    return 'phase1';
  }

  log('Var decls wrapped by label: 0.');
}
