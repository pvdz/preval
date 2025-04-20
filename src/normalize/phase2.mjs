import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before, assertNoDupeNodes } from '../utils.mjs';
import { setPrintVarTyping } from "../../lib/printer.mjs";
import { mergeTyping } from '../bindings.mjs';
import { pruneEmptyFunctions } from '../reduce_static/empty_func.mjs';
import { pruneTrampolineFunctions } from '../reduce_static/trampoline.mjs';
import { pruneExcessiveParams } from '../reduce_static/exparam.mjs';
import { excessiveArgs } from '../reduce_static/excessive_args.mjs';
import { inlineConstants } from '../reduce_static/inline_constants.mjs';
import { multiScopeSSA } from '../reduce_static/multi_scope_ssa.mjs';
import { singleScopeSSA } from '../reduce_static/single_scope_ssa.mjs';
import { inlineSimpleFuncCalls } from '../reduce_static/simple_funcs.mjs';
import { inlineOneTimeFunctions } from '../reduce_static/onetimers.mjs';
import { funcScopePromo } from '../reduce_static/func_scope_promo.mjs';
import { dedupeBranchedReturns } from '../reduce_static/dedupe_ret_branch.mjs';
import { inlineCommonReturns } from '../reduce_static/common_return.mjs';
import { dropUnusedReturns } from '../reduce_static/unused_returns.mjs';
import { singleScopeTdz } from '../reduce_static/single_scope_tdz.mjs';
import { letHoisting } from '../reduce_static/let_hoisting.mjs';
import { ifelseifelse } from '../reduce_static/if_else_if_else.mjs';
import { staticLets } from '../reduce_static/static_lets.mjs';
import { dealiasing } from '../reduce_static/dealiasing.mjs';
import { ifCallIf } from '../reduce_static/if_call_if.mjs';
import { assignHoisting } from '../reduce_static/assign_hoisting.mjs';
import { arrrrrr } from '../reduce_static/arrrr.mjs';
import { constAssigns } from '../reduce_static/const_assigns.mjs';
import { ifFlipping } from '../reduce_static/if_flip.mjs';
import { objlitPropAccess } from '../reduce_static/objlit_prop.mjs';
import { bitSetTests } from '../reduce_static/bit_set_test.mjs';
import { ifUpdateCall } from '../reduce_static/if_update_call.mjs';
import { inlineArgLen } from '../reduce_static/inline_arguments_length.mjs';
import { inlineIdenticalParam } from '../reduce_static/inline_identical_param.mjs';
import { returnClosure } from '../reduce_static/return_closure.mjs';
import { returnArg } from '../reduce_static/return_arg.mjs';
import { typeTrackedTricks } from '../reduce_static/type_tracked_tricks.mjs';
import { arrSpreads } from '../reduce_static/arr_spread.mjs';
import { conditionalTyping } from '../reduce_static/conditional_typing.mjs';
import { findThrowers } from '../reduce_static/throwers.mjs';
import { ifDualAssign } from '../reduce_static/if_dual_assign.mjs';
import { returnsParam } from '../reduce_static/return_param.mjs';
import { ifTestBool } from '../reduce_static/if_test_bool.mjs';
import { spylessVars } from '../reduce_static/spyless_vars.mjs';
import { ifTestFolding } from '../reduce_static/if_test_folding.mjs';
import { stringFusing } from '../reduce_static/string_fusing.mjs';
import { andCases } from '../reduce_static/and_cases.mjs';
import { globalCasting } from '../reduce_static/global_casting.mjs';
import { binExprStmt } from '../reduce_static/bin_expr_stmt.mjs';
import { protoPropReads } from '../reduce_static/proto_prop_reads.mjs';
import { ifLetInit } from '../reduce_static/if_let_init.mjs';
import { coercials } from '../reduce_static/coerced.mjs';
import { redundantWrites } from '../reduce_static/redundant_if_else_writes.mjs';
import { ifHoisting } from '../reduce_static/if_hoisting.mjs';
import { orXor } from '../reduce_static/or_xor.mjs';
import { resolveBoundValueSet } from '../reduce_static/bound_value_set.mjs';
import { typedComparison } from '../reduce_static/typed_comparison.mjs';
import { eqBang } from '../reduce_static/eq_bang.mjs';
import { orOr } from '../reduce_static/or_or.mjs';
import { andAnd } from '../reduce_static/and_and.mjs';
import { branchConstantInlining } from '../reduce_static/branch_constants.mjs';
import { boolTrampolines } from '../reduce_static/bool_trampoline.mjs';
import { restParams } from '../reduce_static/rest_params.mjs';
import { andIfAndIf } from '../reduce_static/and_if_and_if.mjs';
import { ifMerging } from '../reduce_static/if_merging.mjs';
import { ifFalsySpread } from '../reduce_static/if_falsy_spread.mjs';
import { tailBreaking } from '../reduce_static/tail_breaking.mjs';
import { infiniteLoops } from '../reduce_static/infinite_loops.mjs';
import { staticArgOpOutlining } from '../reduce_static/static_arg_op_outlining.mjs';
import { arrMutation } from '../reduce_static/arr_mutation.mjs';
import { functionLocks } from '../reduce_static/function_locks.mjs';
import { readOnce } from '../reduce_static/read_once.mjs';
import { ifTestOnly } from '../reduce_static/if_test_only.mjs';
import { functionSplitting } from '../reduce_static/function_splitting.mjs';
import { tryHoisting } from '../reduce_static/try_hoisting.mjs';
import { implicitThis } from '../reduce_static/implicit_this.mjs';
import { expandoSplitting } from '../reduce_static/expando_splitting.mjs';
import { selfAssignClosure } from '../reduce_static/self_assign_closure.mjs';
import { selfAssignNoop } from '../reduce_static/self_assign_noop.mjs';
import { letAliasing } from '../reduce_static/let_aliase.mjs';
import { aliasedGlobals } from '../reduce_static/aliasing_globals.mjs';
import { simplifyDotCall } from '../reduce_static/dotcall.mjs';
import { testingAlias } from '../reduce_static/testing_alias.mjs';
import { aliasIfIf } from '../reduce_static/alias_if_if.mjs';
import { removeUnusedConstants } from '../reduce_static/remove_unused_constants.mjs';
import { writeOnly } from '../reduce_static/write_only.mjs';
import { fakeDoWhile } from '../reduce_static/fake_do_while.mjs';
import { ifUpdateTest } from '../reduce_static/if_update_test.mjs';
import { labelScoping } from '../reduce_static/label_scoping.mjs';
import { refTracked } from '../reduce_static/ref_tracked.mjs';
import { builtinCases } from '../reduce_static/builtin_cases.mjs';
import { arrayReads } from '../reduce_static/array_reads.mjs';
import { ifTestMerging } from '../reduce_static/if_test_merging.mjs';
import { tryEscaping } from '../reduce_static/try_escaping.mjs';
import { objlitInlining } from '../reduce_static/objlit_inlining.mjs';
import { constAliasing } from '../reduce_static/const_aliasing.mjs';
import { unusedAssigns } from '../reduce_static/unused_assigns.mjs';
import { recursiveFuncs } from '../reduce_static/recursive_funcs.mjs';
import { freeFuncs } from '../reduce_static/free_funcs.mjs';
import { arrMethodCall } from '../reduce_static/arr_method_call.mjs';
import { freeing } from '../reduce_static/freeing.mjs';
import { bufferBase64 } from "../reduce_static/buffer_base64.mjs"
import { letAliasRedundant } from '../reduce_static/let_alias_redundant.mjs';
import { freeLoops } from '../reduce_static/free_loops.mjs';
import { freeNested } from '../reduce_static/free_nested.mjs';
import { redundantInit } from '../reduce_static/redundant_init.mjs';
import { staticIfOutlining } from '../reduce_static/static_if_outlining.mjs';
import { dotcallSelfAssigning } from '../reduce_static/dotcall_self_assigning.mjs';
import { ifTestInvIdent } from '../reduce_static/if_test_inv_ident.mjs';
import { ifWeaving } from '../reduce_static/if_weaving.mjs';
import { ifTestNested } from '../reduce_static/if_test_nested.mjs';
import { frfrTricks } from '../reduce_static/frfr_tricks.mjs';
import { arrCoerce } from '../reduce_static/arr_coerce.mjs';
import { VERBOSE_TRACING } from '../constants.mjs';

//import { phasePrimitiveArgInlining } from '../reduce_static/phase_primitive_arg_inlining.mjs';

// Things to do
// - Inline local constants, numbers, literal idents
// - Inline imported constants
// - Unroll a function when called with a primitive
// - Branch out
// - Const binding folding (const a = $(); const b = a; -> redundant)
// - `let x = $(1); const y = x; x = $(2);` -> `const y = $(1); const x = $(2);`
// - tail break, if not already done; `foo: { break foo; }` the break is redundant. same for other cases where break (and continue) are at the end. Should prefer this to the "Labeled break as direct child of function. Eliminate the break." rule.
// - Unary negative/positive should look at argument
// - Function whose body is one if-else driven by an argument. If the func does not escape then it can be split into two functions and the arg eliminated. in react there is executeDispatchesAndRelease for example.
// - The boolean cast in isNode$1 in react can be moved?
// - If two let bindings are updated in tandom (with same value) then they could be combined (`let x; let y; x = z; y = z; $(x,y); x = zz; y = zz; $(x, y)`, etc)
// - Eliminate continue
// - should Program always have a block just to eliminate the Program? That's not going to fix function boundaries though but maybe it is more consistent anyways?
// - should loops always explicitly end with a continue statement? does that matter?

export function phase2(program, fdata, resolve, req, passes, phase1s, verboseTracing, prng, options) {
  const ast = fdata.tenkoOutput.ast;
  group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');
  if (VERBOSE_TRACING) {
    try {
      setPrintVarTyping(true, fdata); // Handy typing details
      const code = fmat(tmat(ast, true), true);
      setPrintVarTyping(false);
      console.log('\nCurrent state typed (start of phase2)\n--------------\n' + code + '\n--------------\n');
    } catch (e) {
      vlog('printing ast failed');
      console.dir(ast, { depth: null });
      throw e;
    }
    groupEnd();
    group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');
  }

  {
    const {prngSeed, implicitThisIdent, ...rest} = options;
    const keys = Object.keys(rest);
    ASSERT(keys.length === 0, 'phase 2 should not receive these options or this should be updated', keys);
  }

  assertNoDupeNodes(ast, 'body');

  vlog('Phase 2 options:', options);
  const r = _phase2(fdata, prng, options);
  groupEnd();

  // For phase1 it should have unique nodes/pids
  if (r?.next === 'phase1') assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');

  return r;
}
function _phase2(fdata, prng, options = {prngSeed: 1}) {
  // Initially we only care about bindings whose writes have one var decl and only assignments otherwise
  // Due to normalization, the assignments will be a statement. The var decl can not contain an assignment as init.
  // Elimination of var decls or assignments will be deferred. This way we can preserve parent/node
  // relationships which might otherwise break. This means a binding may have been removed from the books
  // even though it's technically still part of the AST. But since we take the books as leading in this step
  // that should not be a problem.

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    // Since we regenerate the pid during every phase1, we should be able to rely on it for DFS ordering.
    // Note: this is not necessarily source order. `x = y` will visit `y` before `x`.
    const rwOrder = meta.reads.concat(meta.writes).sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
      +a < +b ? -1 : +a > +b ? 1 : 0,
    );
    meta.rwOrder = rwOrder;

    if (meta.isConstant && meta.varDeclRef.node.type === 'Identifier') {
      const name2 = meta.varDeclRef.node.name;
      if (name2 !== 'arguments') {
        const meta2 = fdata.globallyUniqueNamingRegistry.get(name2);
        if (meta2.isConstant) {
          vlog('Merging the typing from `' + name2 + '` into `' + name + '`');
          vlog('From typing:', meta2.typing);
          vlog('Into typing:', meta.typing);
          mergeTyping(meta2.typing, meta.typing);
        }
      }
    }

    // We can also settle this in phase1...
    let lastScope = undefined;
    let lastScopeRead = undefined;
    let lastScopeWrite = undefined;
    let lastInnerIf = undefined;
    let lastInnerElse = undefined;
    let lastInnerLoop = undefined;
    let lastInnerCatch = undefined;
    meta.singleScoped = true;
    meta.singleInner = true;
    meta.singleScopeReads = true;
    meta.singleScopeWrites = true;
    rwOrder.some((ref) => {
      if (lastScope === undefined) {
        lastScope = ref.scope;
        lastInnerLoop = ref.innerLoop;
        lastInnerIf = ref.innerIf;
        lastInnerElse = ref.innerElse;
        lastInnerCatch = ref.innerCatch;
      }
      if (lastScope !== ref.scope) {
        meta.singleScoped = false;
      }
      if (lastScope !== ref.scope || lastInnerLoop !== ref.innerLoop || lastInnerIf !== ref.innerIf || lastInnerElse !== ref.innerElse || lastInnerCatch !== ref.innerCatch) {
        meta.singleInner = false;
      }

      if (ref.type === 'read') {
        if (lastScopeRead === undefined) lastScopeRead = ref.scope;
        else if (lastScopeRead !== ref.scope) meta.singleScopeReads = false;
      }
      if (ref.type === 'write') {
        if (lastScopeWrite === undefined) lastScopeWrite = ref.scope;
        else if (lastScopeWrite !== ref.scope) meta.singleScopeWrites = false;
      }

      if (!meta.singleScopeReads && !meta.singleScopeWrites) {
        return true;
      }
    });
  });

  const action = (
    redundantInit(fdata) ||
    dotcallSelfAssigning(fdata) || // This is a real fast one, it only walks the dotcalls
    freeFuncs(fdata, prng, !!options.prngSeed, false) || // Do this first...?
    frfrTricks(fdata) ||

    coercials(fdata) ||
    resolveBoundValueSet(fdata) ||
    removeUnusedConstants(fdata) ||
    builtinCases(fdata) || // fast
    // Do early because it's likely to catch common cases
    refTracked(fdata) ||
    // Do early because it can be expensive with many writes
    arrMutation(fdata) ||
    letHoisting(fdata) ||
    findThrowers(fdata) ||
    singleScopeTdz(fdata) || // Mostly superseded by the TDZ analysis in prepare or phase1 (but still for-in/of cases to fix first)
    constAssigns(fdata) ||
    constAliasing(fdata) ||
    aliasedGlobals(fdata) ||
    freeNested(fdata, prng, !!options.prngSeed) || // I think it's fine to do this early
    simplifyDotCall(fdata) ||
    assignHoisting(fdata) ||
    ifFlipping(fdata) ||
    staticLets(fdata) ||
    pruneEmptyFunctions(fdata) ||
    pruneTrampolineFunctions(fdata) ||
    inlineConstants(fdata) ||
    writeOnly(fdata) ||
    dealiasing(fdata) ||
    singleScopeSSA(fdata) ||
    multiScopeSSA(fdata) ||
    pruneExcessiveParams(fdata) ||
    excessiveArgs(fdata) ||
    inlineOneTimeFunctions(fdata) ||
    inlineSimpleFuncCalls(fdata) ||
    funcScopePromo(fdata) ||
    dedupeBranchedReturns(fdata) ||
    inlineCommonReturns(fdata) ||
    dropUnusedReturns(fdata) ||
    ifelseifelse(fdata) ||
    ifCallIf(fdata) ||
    arrrrrr(fdata) ||
    arrCoerce(fdata) ||
    recursiveFuncs(fdata) ||
    labelScoping(fdata) ||
    objlitPropAccess(fdata) ||
    bitSetTests(fdata) ||
    ifUpdateCall(fdata) ||
    inlineArgLen(fdata) ||
    inlineIdenticalParam(fdata) ||
    returnClosure(fdata) ||
    returnArg(fdata) ||
    ifTestInvIdent(fdata) ||
    ifWeaving(fdata) ||
    typeTrackedTricks(fdata) ||
    arrSpreads(fdata) ||
    conditionalTyping(fdata) ||
    ifTestBool(fdata) ||
    ifTestFolding(fdata) ||
    ifDualAssign(fdata) ||
    returnsParam(fdata) ||
    spylessVars(fdata) ||
    stringFusing(fdata) ||
    andCases(fdata) ||
    globalCasting(fdata) ||
    tryEscaping(fdata) ||
    binExprStmt(fdata) ||
    protoPropReads(fdata) ||
    ifLetInit(fdata) ||
    redundantWrites(fdata) ||
    ifHoisting(fdata) ||
    orXor(fdata) ||
    typedComparison(fdata) ||
    eqBang(fdata) ||
    orOr(fdata) ||
    andAnd(fdata) ||
    ifTestMerging(fdata) ||
    ifTestNested(fdata) ||
    branchConstantInlining(fdata) ||
    boolTrampolines(fdata) ||
    restParams(fdata) ||
    andIfAndIf(fdata) ||
    ifMerging(fdata) ||
    ifFalsySpread(fdata) ||
    tailBreaking(fdata) ||
    infiniteLoops(fdata) || // Make sure to do this before loop unrolling
    arrayReads(fdata) ||
    staticArgOpOutlining(fdata) ||
    staticIfOutlining(fdata) || // Maybe even lower since this duplicates functions? Or maybe higher i dunno.
    functionLocks(fdata) ||
    readOnce(fdata) ||
    ifTestOnly(fdata) ||
    functionSplitting(fdata) ||
    tryHoisting(fdata) ||
    implicitThis(fdata, options.implicitThisIdent) ||
    expandoSplitting(fdata) ||
    selfAssignClosure(fdata) ||
    selfAssignNoop(fdata) ||
    letAliasing(fdata) ||
    letAliasRedundant(fdata) ||
    testingAlias(fdata) ||
    aliasIfIf(fdata) ||
    ifUpdateTest(fdata) ||
    fakeDoWhile(fdata) ||
    unusedAssigns(fdata) ||
    objlitInlining(fdata) ||
    arrMethodCall(fdata) ||
    bufferBase64(fdata) ||

    freeLoops(fdata, prng, !!options.prngSeed) || // Most other stuff should probably precede this?

    freeing(fdata, prng, !!options.prngSeed) || // Do this last. Let other tricks precede it.

    //// This one is very invasive and expands the code. Needs more work.
    //phasePrimitiveArgInlining(program, fdata, resolve, req, options.cloneLimit) ||
  undefined);

  ASSERT(action === undefined || (action && typeof action === 'object'), 'plugins must return an object or undefined', action);
  if (!action) {
    vlog('Phase 2 applied no rules, no changes');
    return;
  }

  ASSERT(typeof action.what === 'string', 'actionwhat should be string', action);
  ASSERT(typeof action.changes === 'number' && action.changes > 0, 'changes is number?', action);
  ASSERT(action.next === 'phase1' || action.next === 'normal', 'next should be phase1 or normal', action);

  return action;
}
