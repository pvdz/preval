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
  group('\n\n\n[labelScoping] Finding var decls to get scoped up by labels\n');
  //currentState(fdata, 'labelScoping', true, fdata);
  const r = _labelScoping(fdata);
  groupEnd();
  return r;
}
function _labelScoping(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;
  const queue = [];

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (node.type !== 'LabeledStatement') return;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const body = parentNode[parentProp];

    let pointer = parentIndex;
    while (pointer > 0) {
      const curr = pointer - 1;
      const stmt = body[curr];
      if (stmt.type === 'VarStatement') {
        // Ok. We have a label preceded by a var decl, now verify that the decl is not used after the label.
        // We can simply check the blockChain property of the last source-order ref for this.

        if (stmt.init.type === 'FunctionExpression') {
          vlog('- bail: do not pull functions in because there is a transform in func_scope_promo that explicitly moves them out and it leads to an infinite loop');
          return;
        }

        const varName = stmt.id.name;
        const meta = fdata.globallyUniqueNamingRegistry.get(varName);
        // TODO: If not single scoped then the closure must happen inside the label too. If it happens before then all bets are off.
        if (!meta.singleScoped) return;

        // If the label has no sub-statements then the last read can't be inside of it, eh?
        if (!node.body.body.length) return;

        // Block chain is the chain of block pid's from current node all the way to Program
        // If one blockChain is a prefix of the other than the one is in a block that is some ancestor of the other
        const firstNode = node.body.body[0];
        const labelBlockChain = firstNode.$p.blockChain;
        const lastRefBlockChain = meta.rwOrder[meta.rwOrder.length - 1].node.$p.blockChain;
        vlog('varname:', varName, ', label block:', [labelBlockChain], ', lastref:', [lastRefBlockChain]);
        if (lastRefBlockChain === labelBlockChain) {
          const a = meta.rwOrder[meta.rwOrder.length - 1].node.$p.npid;
          const b = node.body.$p.lastPid;
          vlog('Same block chain. Check if usage is (or was) before label:', a, '<=', b);
          if (a > b) {
            // Usage is _after_ the label, so nope
            return;
          } else {
            // Special case. The last usage is before the label. Or the index is
            // stale. But in that case it _was_ before the label because it could
            // not suddenly be _after_ the label, so it should still be safe...
          }
        }
        else if (!lastRefBlockChain.startsWith(labelBlockChain)) {
          return;
        }

        // Should be good to go
        rule('If a var decl declared before a label is only used inside the label then the decl can be moved inside the label');
        example('const x = f(); A: { $(x); }', 'A: { const x = f(); $(x); }');
        before(body[curr], body);
        before(body[parentIndex]);

        node.body.body.unshift(stmt); // push into the front of the label body
        body[curr] = AST.emptyStatement();

        queue.push({
          index: curr,
          func: p => body.splice(p, 1),
        });

        after(body[curr]);
        after(body[parentIndex], body);
        ++changes;
        --pointer;

      } else if (stmt.type === 'IfStatement' || stmt.type === 'WhileStatement' || stmt.type === 'TryStatement') {
        // Label is preceded by an if/loop/try statement. It should be safe to move that inside the label as well.
        // There's no scoping risks and I don't think it can affect flow either. Also, I think normalization does
        // this too but in some cases doing it here skips a whole bunch of computation.
        // Doing this should help with our heuristics of consolidating all the things.

        rule('When an if/loop/try is followed by a label statement, it can be moved inside the label');
        example('if (x) y; foo: { z; }', 'foo: { if (x) y; z; }');
        example('while (x) y; foo: { z; }', 'foo: { while (x) y; z; }');
        example('try { x; } catch { y; } foo: { z; }', 'foo: { try { x; } catch { y; } z; }');
        before(body[curr]);
        before(body[parentIndex]);

        node.body.body.unshift(stmt); // push into the front of the label body
        body[curr] = AST.emptyStatement();

        queue.push({
          index: curr,
          func: p => body.splice(p, 1),
        });

        after(body[curr]);
        after(body[parentIndex]);
        ++changes;
        --pointer;
      } else {
        return;
      }

    }
  }

  queue.sort(({ index: a }, { index: b }) => b - a);
  queue.forEach(({index, func}) => func(index));

  if (changes) {
    log('Var decls wrapped by label:', changes, '. Restarting from phase1');
    return {what: 'labelScoping', changes: changes, next: 'phase1'};
  }

  log('Var decls wrapped by label: 0.');
}
