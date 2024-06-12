import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before } from '../utils.mjs';
import { mergeTyping } from '../bindings.mjs';
import { pruneEmptyFunctions } from './empty_func.mjs';
import { pruneTrampolineFunctions } from './trampoline.mjs';
import { pruneExcessiveParams } from './exparam.mjs';
import { excessiveArgs } from './excessive_args.mjs';
import { inlineConstants } from './inline_constants.mjs';
import { multiScopeSSA } from './multi_scope_ssa.mjs';
import { singleScopeSSA } from './single_scope_ssa.mjs';
import { inlineSimpleFuncCalls } from './simple_funcs.mjs';
import { inlineOneTimeFunctions } from './onetimers.mjs';
import { funcScopePromo } from './func_scope_promo.mjs';
import { dedupeBranchedReturns } from './dedupe_ret_branch.mjs';
import { inlineCommonReturns } from './common_return.mjs';
import { dropUnusedReturns } from './unused_returns.mjs';
import { singleScopeTdz } from './single_scope_tdz.mjs';
import { letHoisting } from './let_hoisting.mjs';
import { ifelseifelse } from './if_else_if_else.mjs';
import { staticLets } from './static_lets.mjs';
import { dealiasing } from './dealiasing.mjs';
import { ifCallIf } from './if_call_if.mjs';
import { assignHoisting } from './assign_hoisting.mjs';
import { arrrrrr } from './arrrr.mjs';
import { constAssigns } from './const_assigns.mjs';
import { ifTailExtending } from './if_tail_extending.mjs';
import { ifFlipping } from './if_flip.mjs';
import { objlitPropAccess } from './objlit_prop.mjs';
import { bitSetTests } from './bit_set_test.mjs';
import { ifUpdateCall } from './if_update_call.mjs';
import { inlineArgLen } from './inline_arguments_length.mjs';
import { inlineIdenticalParam } from './inline_identical_param.mjs';
import { returnClosure } from './return_closure.mjs';
import { returnArg } from './return_arg.mjs';
import { constWhileTest } from './const_while_test.mjs';
import { typeTrackedTricks } from './type_tracked_tricks.mjs';
import { arrSpreads } from './arr_spread.mjs';
import { conditionalTyping } from './conditional_typing.mjs';
import { findThrowers } from './throwers.mjs';
import { ifDualAssign } from './if_dual_assign.mjs';
import { returnsParam } from './return_param.mjs';
import { ifTestBool } from './if_test_bool.mjs';
import { spylessVars } from './spyless_vars.mjs';
import { ifTestFolding } from './if_test_folding.mjs';
import { stringFusing } from './string_fusing.mjs';
import { andCases } from './and_cases.mjs';
import { globalCasting } from './global_casting.mjs';
import { binExprStmt } from './bin_expr_stmt.mjs';
import { propertyLookups } from './property_lookups.mjs';
import { letIfElse } from './let_if_else.mjs';
import { coercials } from './coerced.mjs';
import { redundantWrites } from './redundant_if_else_writes.mjs';
import { ifReduceUp } from './if_reduce_up.mjs';
import { orXor } from './or_xor.mjs';
import { resolveBoundValueSet } from './bound_value_set.mjs';
import { typedComparison } from './typed_comparison.mjs';
import { eqBang } from './eq_bang.mjs';
import { orOr } from './or_or.mjs';
import { andAnd } from './and_and.mjs';
import { branchConstantInlining } from './branch_constants.mjs';
import { boolTrampolines } from './bool_trampoline.mjs';
import { restParams } from './rest_params.mjs';
import { andIfAndIf } from './and_if_and_if.mjs';
import { ifMerging } from './if_merging.mjs';
import { ifFalsySpread } from './if_falsy_spread.mjs';
import { tailBreaking } from './tail_breaking.mjs';
import { fakeLoops } from './fake_loops.mjs';
import { unwindWhileWithTest } from './unwind_loop_with_test.mjs';
import { unwindWhileWithCounter } from './unwind_loop_with_counter.mjs';
import { staticArgOpOutlining } from './static_arg_op_outlining.mjs';
import { arr_mutation } from './arr_mutation.mjs';
import { functionLocks } from './function_locks.mjs';
import { readOnce } from './read_once.mjs';
import { testing_only } from './testing_only.mjs';
import { functionSplitting } from './function_splitting.mjs';
import { noopTry } from './noop_try.mjs';
import { implicitThis } from './implicit_this.mjs';
import { expandoSplitting } from './expando_splitting.mjs';
import { selfAssignClosure } from './self_assign_closure.mjs';
import { selfAssignNoop } from './self_assign_noop.mjs';
import { unrollLoopWithTrue } from './unroll_loop_with_true.mjs';
import {letAliasing} from "./let_aliase.mjs"
import {aliasedGlobals} from "./aliasing_globals.mjs"
import {dotCall} from "./dotcall.mjs"
import {testingAlias} from "./testing_alias.mjs";
import {VERBOSE_TRACING} from "../constants.mjs";
import {aliasIfIf} from "./alias_if_if.mjs";
import { removeUnusedConstants } from './remove_unused_constants.mjs';
import { writeOnly } from './write_only.mjs';

//import { phasePrimitiveArgInlining } from './phase_primitive_arg_inlining.mjs';

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

export function phase2(program, fdata, resolve, req, options) {
  const ast = fdata.tenkoOutput.ast;
  group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');
  if (VERBOSE_TRACING) vlog('\nCurrent state (before phase2)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
  vlog('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');
  vlog('Phase 2 options:', options);
  const r = _phase2(program, fdata, resolve, req, options);
  groupEnd();
  return r;
}
function _phase2(program, fdata, resolve, req, options = {}) {
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

    if (meta.isConstant && meta.constValueRef.node.type === 'Identifier') {
      const name2 = meta.constValueRef.node.name;
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

  return (
    coercials(fdata) ||
    resolveBoundValueSet(fdata) ||
    removeUnusedConstants(fdata) ||
    // Do early because it can be expensive with many writes
    arr_mutation(fdata) ||
    findThrowers(fdata) ||
    singleScopeTdz(fdata) || // Mostly superseded by the TDZ analysis in prepare or phase1 (but still for-in/of cases to fix first)
    constAssigns(fdata) ||
    aliasedGlobals(fdata) ||
    dotCall(fdata) ||
    letHoisting(fdata) ||
    ifTailExtending(fdata) ||
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
    objlitPropAccess(fdata) ||
    bitSetTests(fdata) ||
    ifUpdateCall(fdata) ||
    inlineArgLen(fdata) ||
    inlineIdenticalParam(fdata) ||
    returnClosure(fdata) ||
    returnArg(fdata) ||
    constWhileTest(fdata) ||
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
    binExprStmt(fdata) ||
    propertyLookups(fdata) ||
    letIfElse(fdata) ||
    redundantWrites(fdata) ||
    ifReduceUp(fdata) ||
    orXor(fdata) ||
    typedComparison(fdata) ||
    eqBang(fdata) ||
    orOr(fdata) ||
    andAnd(fdata) ||
    branchConstantInlining(fdata) ||
    boolTrampolines(fdata) ||
    restParams(fdata) ||
    andIfAndIf(fdata) ||
    ifMerging(fdata) ||
    ifFalsySpread(fdata) ||
    tailBreaking(fdata) ||
    //fakeLoops(fdata) || // TODO: verify this one. I think it's broken and/or outdated to be rewritten
    unwindWhileWithTest(fdata, options.unrollLimit) ||
    unwindWhileWithCounter(fdata, options.unrollLimit) ||
    staticArgOpOutlining(fdata) ||
    functionLocks(fdata) ||
    readOnce(fdata) ||
    testing_only(fdata) ||
    functionSplitting(fdata) ||
    noopTry(fdata) ||
    implicitThis(fdata, options.implicitThisIdent) ||
    expandoSplitting(fdata) ||
    selfAssignClosure(fdata) ||
    selfAssignNoop(fdata) ||
    letAliasing(fdata) ||
    testingAlias(fdata) ||
    aliasIfIf(fdata) ||
    // This one should probably be lowest priority as it might blow up code...
    unrollLoopWithTrue(fdata, options.unrollTrueLimit)


    //// This one is very invasive and expands the code. Needs more work.
    //phasePrimitiveArgInlining(program, fdata, resolve, req, options.cloneLimit) ||
  );

  // The read/write data should still be in tact at this point
}
