import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';

// TODO: we should be able to remove this in favor of the prepare phase. But the prepare phase must be more generic and catch more cases.
// There's for-in/of cases like this:
// - tests/cases/normalize/expressions/assignments/for_of_right/
// - tests/cases/normalize/expressions/assignments/for_in_right/**
// - tests/cases/normalize/expressions/statement/for_of_right/**
// - tests/cases/normalize/binding/for-header-ident-rhs-scoping.md
// - tests/cases/normalize/binding/for-header-pattern-rhs-scoping-tdz.md
// - tests/cases/normalize/branching/ifelse_with_tail_closure_binding2.md


export function singleScopeTdz(fdata) {
  group('\n\n\nChecking for TDZ cases in single scope\n');
  const r = _singleScopeTdz(fdata);
  groupEnd();
  return r;
}
function _singleScopeTdz(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let foundTdz = 0;

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    //if (meta.isConstant) return; // let or const is irrelevant
    if (meta.isImplicitGlobal) return;
    //if (meta.isExport) return; // Just do skip the actual export refs as they sorta hoist
    if (meta.constValueRef.containerNode.type !== 'VariableDeclaration') return; // catch, for-x, ???
    if (foundTdz) return;

    vgroup('- `' + name + '`:', meta.constValueRef.node.type, ', reads:', meta.reads.length, ', writes:', meta.writes.length);
    process(meta, name);
    vgroupEnd();
  });

  function process(meta, name) {
    vlog('The binding `' + name + '` is a var decl. Analyzing usages (', meta.reads.length, 'reads and', meta.writes.length, 'writes).');

    const rwOrder = meta.rwOrder;
    vlog('rwOrder:', [rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.node.$p.pid).join(', ')]);

    const declScope = meta.bfuncNode.$p.pid;
    vlog(
      'Decl scope:',
      declScope,
      ', ref scopes:',
      rwOrder.map((ref) => +ref.pfuncNode.$p.pid),
    );

    const varDeclWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varDeclWrite);
    const declBlockChain = varDeclWrite.blockChain;

    vlog('Checking whether all refs can reach the decl');
    if (
      rwOrder.some((ref, i) => {
        if (ref === varDeclWrite || ref.blockChain.startsWith(declBlockChain)) {
          // can reach
        } else {
          return true;
        }
      })
    ) {
      // Can happen when a write is in a block and the read the block (`try {} finally { x = 5} f(x);`).
      // In that case the algo correctly finds that the earlier assignments to `x` are unobservable but since
      // the write is inside a block, the outer read cannot reach it and it breaks.
      // (One solution might be to use vars in that case in normalized code, but that seems a bit unnecessary...)
      vlog('There is at least one read that cannot reach the write. We cannot SSA this safely.');
      return;
    }

    let allInSameScope = meta.singleScoped;
    vlog('allInSameScope:', allInSameScope);
    if (!allInSameScope) return;

    const declFirst = rwOrder[0] === varDeclWrite;
    vlog('declFirst:', declFirst);
    if (declFirst) return;

    const innerLoop = declFirst.innerLoop;
    const declLooped = innerLoop > 0;
    vlog('declLooped:', declLooped);

    // Analysis is a little easier when we don't have to worry about closures
    vlog('This binding was only used in the same scope it as was defined in');

    // If there was a read or write to this binding before the decl then check whether we are in a loop.
    // If inside a loop then special case it. Otherwise it must be a TDZ error. One of the few cases we
    // can catch. (Un?)fortunately TDZ errors are rare as they would be actual runtime problems.

    // Note: this crash may still be conditional.
    vlog('There were references to `' + name + '` before their var decl and there is no closure so we must check for a runtime TDZ error');

    for (let i = 0; rwOrder[i] !== varDeclWrite; ++i) {
      const ref = rwOrder[i];

      if (!declLooped || ref.innerLoop !== innerLoop) {
        rule('Reference to future binding when binding is not in same loop and not a closure must mean TDZ');
        example('x; let x = 10;', 'throw error; let x = 10;');
        before(ref.node, ref.blockBody[ref.blockIndex]);

        ref.blockBody[ref.blockIndex] = AST.throwStatement(
          AST.templateLiteral('Preval: Cannot access `' + name + '` before initialization'),
        );

        after(ref.blockBody[ref.blockIndex]);

        // This will shortcut this step and request another normalization step. This is necessary because other
        // references may be stale now and dead code is probably introduced for all the code after the new `throw`.
        // It's fine since this should be a very rare occurrence in real world code.
        ++foundTdz;
      }
    }
  }

  if (foundTdz) {
    log('Found TDZ errors:', foundTdz, '. Restarting from from normalization to eliminate dead code.');
    return {what: 'singleScopeSSA', changes: foundTdz, next: 'normal'}; // Need to potentially eliminate dead code (!)
  }

  log('Found TDZ errors:: 0.');
}
