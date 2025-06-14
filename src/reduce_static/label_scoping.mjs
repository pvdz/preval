// Find labels that are preceded by a var decl where that var is only used inside the label block
// In that case the var decl can be moved inside the label, which may appease certain heuristics.
//
//    `const x = f(); A: { ...; g(x); }`
// -> `A: { const x = f(); ...; g(x); }`
//

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, fmat, tmat, rule, example, before, source, after, findBodyOffset, riskyRule, todo, currentState } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { setPrintPids } from '../../lib/printer.mjs';

export function labelScoping(fdata) {
  group('\n\n\n[labelScoping] Finding var decls to get scoped up by labels\n');
  // currentState(fdata, 'labelScoping', true, fdata);

  // setPrintPids(true);
  // currentState(fdata, 'labelScoping', true, fdata);
  // setPrintPids(false);

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

        // If all refs are inside the label scope then we're good. Scoping shouldn't matter here.
        const first = node.$p.npid;
        const last = node.$p.lastPid;

        // console.log('wot?', first, last)

        if (!meta.rwOrder.every(ref => {
          // console.log('test:', ref.kind, ref.node.$p.npid)
          if (ref.kind === 'var') return true; // skip the var decl itself
          const pid = ref.node.$p.npid;
          vlog('  - check:', pid, '?', first, '~', last);
          return (pid >= first && pid <= last);
        })) {
          vlog('- bail: at least one reference was outside of the label;', varName, node.label.name);
          return;
        }

        // Should be good to go
        rule('If a var decl declared before a label is only used inside the label then the decl can be moved inside the label');
        example('const x = f(); A: { $(x); }', 'A: { const x = f(); $(x); }');
        before(body[curr], body);
        before(body[parentIndex]);

        node.body.body.unshift(stmt); // push into the front of the label body
        const newNode = AST.emptyStatement(); // We remmeber this so we can search for it.
        body[curr] = newNode;

        queue.push(() => {
          // We can't rely on the index anymore because multiple unshifts may have happened but since we don't
          // splice, the statement must still be there. Find it. Eliminate it.
          // This is the only thing that should happen in these queues so it should be safe to just do since
          // every queued step will lookup their node (again) before eliminating it.
          const index = body.indexOf(newNode);
          ASSERT(index >= 0, 'the new node should not have disappeared');
          body.splice(index, 1);
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
        const newNode = AST.emptyStatement();
        body[curr] = newNode;

        queue.push(() => {
          // We can't rely on the index anymore because multiple unshifts may have happened but since we don't
          // splice, the statement must still be there. Find it. Eliminate it.
          // This is the only thing that should happen in these queues so it should be safe to just do since
          // every queued step will lookup their node (again) before eliminating it.
          const index = body.indexOf(newNode);
          ASSERT(index >= 0, 'the new node should not have disappeared');
          body.splice(index, 1);
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

  // No need to sort them. They will look up their target based on the current AST, not index caches.
  queue.forEach(func => func());

  if (changes) {
    log('Var decls wrapped by label:', changes, '. Restarting from phase1');
    return {what: 'labelScoping', changes: changes, next: 'phase1'};
  }

  log('Var decls wrapped by label: 0.');
}
