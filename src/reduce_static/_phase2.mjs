import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat } from '../utils.mjs';
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
//import {letTrueWhile} from "./let_true_while.mjs";
//import {letIfElseFalseWhile} from "./let_if_while_x.mjs";
//import {testingAlias} from "./testing_alias.mjs";
import {VERBOSE_TRACING} from "../constants.mjs"
//import {aliasIfIf} from "./alias_if_if.mjs"

//import { phasePrimitiveArgInlining } from './phase_primitive_arg_inlining.mjs';

// Things to do
// - Inline local constants, numbers, literal idents
// - Inline imported constants
// - Unroll a function when called with a primitive
// - Branch out
// - Const binding folding (const a = $(); const b = a; -> redundant)
// - Unary negative/positive should look at argument

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
    const rwOrder = [...meta.reads, ...meta.writes].sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
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
    let lastInnerFinally = undefined;
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
        lastInnerFinally = ref.innerCatch;
      }
      if (lastScope !== ref.scope) {
        meta.singleScoped = false;
      }
      if (lastScope !== ref.scope || lastInnerLoop !== ref.innerLoop || lastInnerIf !== ref.innerIf || lastInnerElse !== ref.innerElse || lastInnerCatch !== ref.innerCatch || lastInnerFinally !== ref.innerFinally) {
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

  const coerced = coercials(fdata);
  if (coerced) return coerced;

  const bounds = resolveBoundValueSet(fdata);
  if (bounds) return bounds;

  const am = arr_mutation(fdata); // Do early because it can be expensive with many writes
  if (am) return am;

  const throwers = findThrowers(fdata);
  if (throwers) return throwers;

  const tdzd = singleScopeTdz(fdata);
  if (tdzd) return tdzd;

  const consts = constAssigns(fdata);
  if (consts) return consts;

  const ag = aliasedGlobals(fdata);
  if (ag) return ag;

  const dc = dotCall(fdata);
  if (dc) return dc;

  const moved = letHoisting(fdata);
  if (moved) return moved;

  const extended = ifTailExtending(fdata);
  if (extended) return extended;

  const moved2 = assignHoisting(fdata);
  if (moved2) return moved2;

  const flipped = ifFlipping(fdata);
  if (flipped) return flipped;

  const staticLetsInlined = staticLets(fdata);
  if (staticLetsInlined) return staticLetsInlined;

  const emptyFuncs = pruneEmptyFunctions(fdata);
  if (emptyFuncs) return emptyFuncs;

  const trampFuncs = pruneTrampolineFunctions(fdata);
  if (trampFuncs) return trampFuncs;

  const inlinedConstants = inlineConstants(fdata);
  if (inlinedConstants) return inlinedConstants;

  const dealiased = dealiasing(fdata);
  if (dealiased) return dealiased;

  const singleSSA = singleScopeSSA(fdata);
  if (singleSSA) return singleSSA;

  const multiSSA = multiScopeSSA(fdata);
  if (multiSSA) return multiSSA;

  const prunedParams = pruneExcessiveParams(fdata);
  if (prunedParams) return prunedParams;

  const ea = excessiveArgs(fdata);
  if (ea) return ea;

  const singled = inlineOneTimeFunctions(fdata);
  if (singled) return singled;

  const simpled = inlineSimpleFuncCalls(fdata);
  if (simpled) return simpled;

  const globaled = funcScopePromo(fdata);
  if (globaled) return globaled;

  const deduped = dedupeBranchedReturns(fdata);
  if (deduped) return deduped;

  const commoned = inlineCommonReturns(fdata);
  if (commoned) return commoned;

  const dropped = dropUnusedReturns(fdata);
  if (dropped) return dropped;

  const ifelsed = ifelseifelse(fdata);
  if (ifelsed) return ifelsed;

  const ifcallifed = ifCallIf(fdata);
  if (ifcallifed) return ifcallifed;

  const arrrrred = arrrrrr(fdata);
  if (arrrrred) return arrrrred;

  const propped = objlitPropAccess(fdata);
  if (propped) return propped;

  const bitset = bitSetTests(fdata);
  if (bitset) return bitset;

  const callsHoisted = ifUpdateCall(fdata);
  if (callsHoisted) return callsHoisted;

  const lengthed = inlineArgLen(fdata);
  if (lengthed) return lengthed;

  const identicals = inlineIdenticalParam(fdata);
  if (identicals) return identicals;

  const unclosured = returnClosure(fdata);
  if (unclosured) return unclosured;

  const retargs = returnArg(fdata);
  if (retargs) return retargs;

  const whiled = constWhileTest(fdata);
  if (whiled) return whiled;

  const typed = typeTrackedTricks(fdata);
  if (typed) return typed;

  const spread = arrSpreads(fdata);
  if (spread) return spread;

  const condTypings = conditionalTyping(fdata);
  if (condTypings) return condTypings;

  const testsBooled = ifTestBool(fdata);
  if (testsBooled) return testsBooled;

  const ifsFolded = ifTestFolding(fdata);
  if (ifsFolded) return ifsFolded;

  const dualed = ifDualAssign(fdata);
  if (dualed) return dualed;

  const returnedParams = returnsParam(fdata);
  if (returnedParams) return returnedParams;

  const varsMoved = spylessVars(fdata);
  if (varsMoved) return varsMoved;

  const fused = stringFusing(fdata);
  if (fused) return fused;

  const ands = andCases(fdata);
  if (ands) return ands;

  const casted = globalCasting(fdata);
  if (casted) return casted;

  const binned = binExprStmt(fdata);
  if (binned) return binned;

  const looked = propertyLookups(fdata);
  if (looked) return looked;

  const leffed = letIfElse(fdata);
  if (leffed) return leffed;

  const rwrites = redundantWrites(fdata);
  if (rwrites) return rwrites;

  const redupped = ifReduceUp(fdata);
  if (redupped) return redupped;

  const orxors = orXor(fdata);
  if (orxors) return orxors;

  const comps = typedComparison(fdata);
  if (comps) return comps;

  const ebts = eqBang(fdata);
  if (ebts) return ebts;

  const ores = orOr(fdata);
  if (ores) return ores;

  const ants = andAnd(fdata);
  if (ants) return ants;

  const bc = branchConstantInlining(fdata);
  if (bc) return bc;

  const bt = boolTrampolines(fdata);
  if (bt) return bt;

  const rp = restParams(fdata);
  if (rp) return rp;

  const iaia = andIfAndIf(fdata);
  if (iaia) return iaia;

  const im = ifMerging(fdata);
  if (im) return im;

  const ifs = ifFalsySpread(fdata);
  if (ifs) return ifs;

  const tb = tailBreaking(fdata);
  if (tb) return tb;

  const fl = fakeLoops(fdata);
  if (fl) return fl;

  const uwt = unwindWhileWithTest(fdata, options.unrollLimit);
  if (uwt) return uwt;

  const uwc = unwindWhileWithCounter(fdata, options.unrollLimit);
  if (uwc) return uwc;

  const sao = staticArgOpOutlining(fdata);
  if (sao) return sao;

  const ful = functionLocks(fdata);
  if (ful) return ful;

  const ro = readOnce(fdata);
  if (ro) return ro;

  const to = testing_only(fdata);
  if (to) return to;

  const fp = functionSplitting(fdata);
  if (fp) return fp;

  const nt = noopTry(fdata);
  if (nt) return nt;

  const it = implicitThis(fdata, options.implicitThisIdent);
  if (it) return it;

  const ep = expandoSplitting(fdata);
  if (ep) return ep;

  const sac = selfAssignClosure(fdata);
  if (sac) return sac;

  const san = selfAssignNoop(fdata);
  if (san) return san;

  const la = letAliasing(fdata);
  if (la) return la;

  // TODO: enable after rewriting the while logic
  //const ltw = letTrueWhile(fdata);
  //if (ltw) return ltw;
  //
  //const liwx = letIfElseFalseWhile(fdata);
  //if (liwx) return liwx;

  //const ta = testingAlias(fdata);
  //if (ta) return ta;

  //const aii = aliasIfIf(fdata);
  //if (aii) return aii;

  // This one should probably be lowest priority as it might blow up code...
  const ulwt = unrollLoopWithTrue(fdata, options.unrollTrueLimit);
  if (ulwt) return ulwt;


  // This one is very invasive and expands the code. Needs more work.
  // const duped = phasePrimitiveArgInlining(program, fdata, resolve, req, options.cloneLimit);
  // if (duped) return duped;

  // The read/write data should still be in tact at this point
}
