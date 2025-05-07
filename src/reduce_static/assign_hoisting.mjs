// If a decl is followed by a ref and has no observable side effects in between then the assignment is the actual decl init.
// This transform attempts to find these cases and promote the assignments likewise.
//
// ```
// let x = undefined;
// const f = function(){ $(x); };    // ^^^
// x = fetch();
// ```
// ->
// ```
// const f = function(){ $(x); };
// let x = undefined;
// x = fetch();
// ```
// ->
// ```
// const f = function(){ $(x); };
// const x = fetch();
// ```
//

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat, findBodyOffset, todo, currentState } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function assignHoisting(fdata) {
  group('\n\n\n[assignHoisting] Checking for assignments that are actually a decl init');
  currentState(fdata, 'assignHoisting', true);
  const r = _assignHoisting(fdata);
  groupEnd();
  return r;
}
function _assignHoisting(fdata) {
  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('Assignments promoted:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'assignHoisting', changes: updated, next: 'phase1'};
  }
  log('Assignments promoted: 0.');
}

function processAttempt(fdata) {
  let updated = 0;

  // Consider `let x = undefined; function f(){}; x = 10;`. We want to move the decl of x closer to the init ofx.
  // However, we can't safely move func decls over those init assignments because that may lead to TDZ problems
  // Ex: `let x = undefined; function f(){g()} function g(){} x = f();` if you move `g` to be after the assignment
  // then the call to `f` will now trigger tdz.
  // To work around this problem we limit ourselves to inits that either refer to bindings that are not local to the
  // enclosing function, or whose decl init is a Param (essentially the same). We can't also allow non-funcs because
  // they may still be funcs with the same problem.

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return;

    vgroup('- `' + name + '`');
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, metaName) {
    const rwOrder = meta.rwOrder;
    if (rwOrder.length <= 1) return vlog('- bail: there is no second ref');
    const first = rwOrder[0];
    if (first.action !== 'write' || first.kind !== 'var') return;

    // So we have a let decl and the first write in that scope after the decl.
    // Now we must confirm whether they can be combined.
    // We can do that when there's zero or more var statements between decl and assign, nothing else, and:
    // - Back to back; the merge is trivial
    //   - `let x = y; x = 2`
    // - Single scope, no prev ref, assign is second ref; I don't think this can leak so it should be safe to move down?
    //   - `let x = f(); const y = z(); x = g()`
    //   - this is a superset of the back-to-back rule
    // - multi-scope:
    //   - if var is first write and assign is second write, is there any way merging them is going to break?
    //   - otherwise var might be closure already; so only when no spying in between
    //
    // In this context a value is "pure" when it doesn't reference any other value and can't trigger a spy.

    function isPure(node) {
      if (AST.isPrimitive(node)) return true;
      switch (node.type) {
        case 'FunctionExpression': return true;
        case 'ArrayExpression': return node.elements.every(enode => !enode || (enode.type !== 'SpreadElement' && isPure(enode)));
        case 'ObjectExpression': return node.properties.every(pnode => pnode.type !== 'SpreadElement' && (!pnode.computed || isPure(pnode.key)) && isPure(pnode.value));
        // Classes are probably okay similar to objects
        case 'EmptyStatement': return true;
        case 'VarStatement': return isPure(node.init);
        case 'DebuggerStatement': return true; // Rare case but I think it's fine. This means a param is re-assigned and not observed.
      }
      return false;
    }

    if (meta.singleScoped) {
      const second = meta.rwOrder[1];
      if (first.blockBody !== second.blockBody) {
        // This can be okay if the remaining refs are in the same block as the assign, which implies the init is never read
        let ok = true;
        for (let i=2; i<meta.rwOrder.length; ++i) {
          if (meta.rwOrder[i].blockBody !== second.blockBody) {
            ok = false;
          }
        }
        if (!ok) {
          return vlog('- bail: second ref is not in same block as decl');
        }

        // This is something like
        // `let x = 1; while (true) { ...; x = 2; ...; $(x); }`, which we can safely change to `1; while (true) { ...; let x = 2; ...; $(x); }`

      }
      if (second.action !== 'write') return vlog('- bail: second ref of single scoped var is not a write');
      if (second.kind !== 'assign') return vlog('- bail: write is not an assign...', second.kind);

      // The simpler case; the var should be the first write (tdz if not) and the init
      // is unobservable. As such, it should be safe to change the init to an expr stmt
      // and move the decl to the assignment spot.

      const firstNode = first.blockBody[first.blockIndex];
      const secondNode = second.blockBody[second.blockIndex];

      ASSERT(secondNode.expression.type === 'AssignmentExpression' && secondNode.expression.left.type === 'Identifier' && secondNode.expression.left.name === metaName, 'umm, help fixme', metaName, secondNode);

      rule('A single scoped decl whose init is not observed should move the decl to the first assign');
      example('let x = undefined; let y = f(); x = y;', 'undefined; let y = f(); let x = y;');
      before(firstNode);
      before(secondNode);

      // Some nodes are irrelevant as statements and we should avoid them.
      if (['Param', 'FunctionExpression'].includes(firstNode.init.type) || AST.isPrimitive(firstNode.init)) {
        first.blockBody[first.blockIndex] = AST.emptyStatement();
      } else {
        first.blockBody[first.blockIndex] = AST.expressionStatement(firstNode.init);
      }
      second.blockBody[second.blockIndex] = AST.varStatement('let', metaName, secondNode.expression.right);

      after(first.blockBody[first.blockIndex]);
      after(second.blockBody[second.blockIndex]);
      updated += 1;
      return;
    }
    else {
      // More complex case. We must ensure that any statement in between cannot spy.
      // Only then are we in the same situation as the single scoped case.

      vlog('Multi-scoped closure. Discovering next ref...');

      // First we must discover the next ref in the same scope as the decl. And confirm that's a write.

      let n = 1;
      while (n < rwOrder.length && rwOrder[n].blockBody !== first.blockBody) ++n;
      if (n >= rwOrder.length) {
        return vlog('- bail: decl has no immediate write in same block');;
      }
      vlog('First ref index in same scope as and after the decl:', n);
      let second = rwOrder[n];
      ASSERT(second);
      if (second.action !== 'write') return vlog('- bail: ref is not a write');
      if (second.kind !== 'assign') return vlog('- bail: write is not an assign...', second.kind);

      const block = first.blockBody;
      const start = first.blockIndex;
      const stop = second.blockIndex;
      if (n !== 1) {
        // If the assign is the second ref then there's no way it become a closure between the two refs so we're ok, too?

        let failed = false;
        for (let i=start+1; i<stop; ++i) {
          vlog('  - testing body['+ i + ']:', block[i]?.type, block[i]?.init?.type ?? block[i]?.expression?.type ?? '');
          if (!isPure(block[i])) {
            failed = true;
            break;
          }
        }
        if (failed) return vlog('- bail: unpure statement between');
      }

      vlog('all statements between the decl and the next ref have no observable side effects');

      rule('If there are no observable side effects between a decl and its first write then the first write becomes a var decl');
      example('let x = undefined; let f = function(){}; x = 10;', 'undefined; let = function(){}; let x = 10;');
      before(block[start]);
      before(block[stop]);

      // Some nodes are irrelevant as statements and we should avoid them.
      if (['Param', 'FunctionExpression'].includes(block[start].init.type) || AST.isPrimitive(block[start].init)) {
        block[start] = AST.emptyStatement();
      } else {
        block[start] = AST.expressionStatement(block[start].init);
      }
      block[stop] = AST.varStatement('let', block[stop].expression.left, block[stop].expression.right);

      after(block[start]);
      after(block[stop]);
      updated += 1;
      return;
    }
  }

  return updated;
}
