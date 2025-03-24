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

export function assignHoisting(fdata) {
  group('\n\n\nChecking for assignments that are actually a decl init');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _assignHoisting(fdata);
  groupEnd();
  return r;
}
function _assignHoisting(fdata) {
  const ast = fdata.tenkoOutput.ast;

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

  function process(meta, name) {
    const rwOrder = meta.rwOrder;
    const first = rwOrder[0];
    if (first.action !== 'write' || first.kind !== 'var') return;
    vlog(
      '`' + name + '`:',
      rwOrder.map((ref) => ref.action + ':' + ref.kind),
    );
    let n = 1;
    while (n < rwOrder.length && rwOrder[n].pfuncNode !== first.pfuncNode) ++n;
    if (n >= rwOrder.length) {
      vlog('No same scoped ref after the decl');
      return;
    }
    vlog('First ref index in same scope as and after the decl:', n);

    let second = rwOrder[n];
    if (first.blockBody !== second.blockBody) {
      // TODO: we can improve on this one but let's keep it simple for now
      vlog('second ref is not in same block');
      return;
    }
    if (second.action !== 'write') {
      vlog('second ref not a write');
      return;
    }
    if (second.kind !== 'assign') {
      vlog('second ref not an assign');
      return;
    }

    vlog('First ref in same scope after the var decl is an assign.');
    vlog(first.action, first.kind, second.action, second.kind);

    const block = first.blockBody;
    const start = first.blockIndex;
    const stop = second.blockIndex;

    ASSERT(block[stop]?.expression?.type === 'AssignmentExpression');
    ASSERT(
      block[stop].expression.left.name === name,
      'the second write was an assignment ref so this should be an assign to ident and the ident should match the name',
    );

    let index = start + 1;
    while (index < stop) {
      const node = block[index];

      if (node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression') {
        // The lhs is allowed to be a local reference
        if (node.$p.reffedNamesCache === undefined) {
          node.$p.reffedNamesCache = [...AST.ssaFindIdentRefs(node.expression.right)];
        }
      } else if (node.type === 'VarStatement') {
        // The lhs is allowed to be a local reference
        if (node.$p.reffedNamesCache === undefined) {
          node.$p.reffedNamesCache = [...AST.ssaFindIdentRefs(node.init)];
        }
      } else if (node.type === 'ExpressionStatement') {
        if (node.$p.reffedNamesCache === undefined) {
          node.$p.reffedNamesCache = [...AST.ssaFindIdentRefs(node)];
        }
      } else {
        // Ignore other statements
        return;
      }

      const reffedNames = node.$p.reffedNamesCache;
      ASSERT(reffedNames, 'see above');
      if (reffedNames === false) break;

      if (
        reffedNames.some((name) => meta.bfuncNode.$p.ownBindings.has(name) && !meta.bfuncNode.$p.paramNames.includes(name)) &&
        !AST.expressionHasNoObservableSideEffect(node)
      ) {
        vlog('The next statement uses at least one local binding or could observe it and it was not a param name.');
        return;
      }
      ++index;
    }

    vlog('all statements between the decl and the next ref have no observable side effects');

    rule('If there are no observable side effects between a decl and its first write then the first write becomes a var decl');
    example('let x = undefined; let f = function(){}; x = 10;', 'undefined; let = function(){}; let x = 10;');
    before(block[start]);
    before(block[stop]);

    block[start] = AST.expressionStatement(block[start].init);
    block[stop] = AST.varStatement('let', block[stop].expression.left, block[stop].expression.right);

    after(block[start]);
    after(block[stop]);
    ++updated;
  }

  return updated;
}
