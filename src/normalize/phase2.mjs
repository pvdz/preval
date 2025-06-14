import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before, assertNoDupeNodes, currentState, ENABLE_REF_TRACKING, } from '../utils.mjs';
import { DIM, RESET, VERBOSE_TRACING } from '../constants.mjs';
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
import { letAliasing } from '../reduce_static/let_aliasing.mjs';
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
import { ifTestAliased } from '../reduce_static/if_test_aliased.mjs';
import { ifFoldTernaryConst } from '../reduce_static/if_fold_ternary_const.mjs';
import { tandemAlias } from '../reduce_static/tandem_alias.mjs';
import { ternaryConstBounded } from '../reduce_static/ternary_const_bounded.mjs';
import { ifTestAnded } from '../reduce_static/if_test_anded.mjs';
import { ifTestTransitive } from '../reduce_static/if_test_transitive.mjs';
import { ifBooly } from '../reduce_static/if_booly.mjs';

//import { phasePrimitiveArgInlining } from '../reduce_static/phase_primitive_arg_inlining.mjs';

export const BASE_PHASE2_RULES_LIST = [
  ['assignHoisting', assignHoisting],
  ['dotcallSelfAssigning', dotcallSelfAssigning], // This is a real fast one, it only walks the dotcalls
  ['freeFuncs', freeFuncs], // Do this first...?
  ['frfrTricks', frfrTricks],
  ['coercials', coercials],
  ['removeUnusedConstants', removeUnusedConstants],
  ['builtinCases', builtinCases], // fast
  // Do early because it can be expensive with many writes
  ['arrMutation', arrMutation],
  ['findThrowers', findThrowers],
  ['constAssigns', constAssigns],
  ['constAliasing', constAliasing],
  ['aliasedGlobals', aliasedGlobals],
  ['freeNested', freeNested], // I think it's fine to do this early
  ['simplifyDotCall', simplifyDotCall],
  ['ifFlipping', ifFlipping],
  ['staticLets', staticLets],
  ['pruneEmptyFunctions', pruneEmptyFunctions],
  ['pruneTrampolineFunctions', pruneTrampolineFunctions],
  ['inlineConstants', inlineConstants],
  ['writeOnly', writeOnly],
  ['dealiasing', dealiasing],
  ['multiScopeSSA', multiScopeSSA],
  ['pruneExcessiveParams', pruneExcessiveParams],
  ['excessiveArgs', excessiveArgs],
  ['inlineOneTimeFunctions', inlineOneTimeFunctions],
  ['inlineSimpleFuncCalls', inlineSimpleFuncCalls],
  ['funcScopePromo', funcScopePromo],
  ['dedupeBranchedReturns', dedupeBranchedReturns],
  ['inlineCommonReturns', inlineCommonReturns],
  ['dropUnusedReturns', dropUnusedReturns],
  ['ifelseifelse', ifelseifelse],
  ['ifCallIf', ifCallIf],
  ['arrrrrr', arrrrrr],
  ['arrCoerce', arrCoerce],
  ['recursiveFuncs', recursiveFuncs],
  ['labelScoping', labelScoping],
  ['objlitPropAccess', objlitPropAccess],
  ['singleScopeTdz', singleScopeTdz], // Mostly superseded by the TDZ analysis in prepare or phase1 (but still for-in/of cases to fix first)
  ['bitSetTests', bitSetTests],
  ['ifUpdateCall', ifUpdateCall],
  ['inlineArgLen', inlineArgLen],
  ['inlineIdenticalParam', inlineIdenticalParam],
  ['letHoisting', letHoisting], // Should try to improve this one to prevent it making one change per iteration
  ['returnClosure', returnClosure],
  ['returnArg', returnArg],
  ['ifTestInvIdent', ifTestInvIdent],
  ['ifWeaving', ifWeaving],
  ['ifFoldTernaryConst', ifFoldTernaryConst],
  ['typeTrackedTricks', typeTrackedTricks],
  ['arrSpreads', arrSpreads],
  ['conditionalTyping', conditionalTyping],
  ['ifTestBool', ifTestBool],
  ['ifTestFolding', ifTestFolding],
  ['returnsParam', returnsParam],
  ['spylessVars', spylessVars],
  ['stringFusing', stringFusing],
  ['andCases', andCases],
  ['globalCasting', globalCasting],
  ['tryEscaping', tryEscaping],
  ['binExprStmt', binExprStmt],
  ['protoPropReads', protoPropReads],
  ['ifHoisting', ifHoisting],
  ['orXor', orXor],
  ['typedComparison', typedComparison],
  ['eqBang', eqBang],
  ['orOr', orOr],
  ['andAnd', andAnd],
  ['ifTestMerging', ifTestMerging],
  ['ifTestNested', ifTestNested],
  ['branchConstantInlining', branchConstantInlining],
  ['boolTrampolines', boolTrampolines],
  ['restParams', restParams],
  ['andIfAndIf', andIfAndIf],
  ['ifMerging', ifMerging],
  ['ifFalsySpread', ifFalsySpread],
  ['tailBreaking', tailBreaking],
  ['infiniteLoops', infiniteLoops], // Make sure to do this before loop unrolling
  ['arrayReads', arrayReads],
  ['staticArgOpOutlining', staticArgOpOutlining],
  ['staticIfOutlining', staticIfOutlining], // Maybe even lower since this duplicates functions? Or maybe higher i dunno.
  ['functionLocks', functionLocks],
  ['readOnce', readOnce],
  ['ifTestOnly', ifTestOnly],
  ['functionSplitting', functionSplitting],
  ['tryHoisting', tryHoisting],
  ['implicitThis', implicitThis],
  ['expandoSplitting', expandoSplitting],
  ['selfAssignClosure', selfAssignClosure],
  ['selfAssignNoop', selfAssignNoop],
  ['letAliasing', letAliasing],
  ['testingAlias', testingAlias],
  ['aliasIfIf', aliasIfIf],
  ['ifUpdateTest', ifUpdateTest],
  ['fakeDoWhile', fakeDoWhile],
  ['unusedAssigns', unusedAssigns],
  ['objlitInlining', objlitInlining],
  ['bufferBase64', bufferBase64],
  ['ifTestAliased', ifTestAliased],
  ['tandemAlias', tandemAlias],
  ['ternaryConstBounded', ternaryConstBounded],
  ['ifTestAnded', ifTestAnded],
  ['ifTestTransitive', ifTestTransitive],
  ['ifBooly', ifBooly],

  ['freeLoops', freeLoops], // Most other stuff should probably precede this?

  ['freeing', freeing], // Do this last. Let other tricks precede it.

  ...ENABLE_REF_TRACKING?[
    ['redundantInit', redundantInit], // RT
    // Do early because it's likely to catch common cases
    ['refTracked', refTracked], // RT
    ['singleScopeSSA', singleScopeSSA], // RT
    ['ifLetInit', ifLetInit], // RT
    ['redundantWrites', redundantWrites], // RT
    ['arrMethodCall', arrMethodCall], // RT
  ]:[]


  //// This one is very invasive and expands the code. Needs more work.
  //['phasePrimitiveArgInlining', phasePrimitiveArgInlining],
];

export function getFreshPhase2RulesState() {
  // Phase2 will rotate the rules as they get used so we need to create a fresh list
  // for every file (for the sake of consistency and reproducability, relevant for
  // debugging and tests).
  // The main running basically passes on this list by reference every time phase2 runs.
  return BASE_PHASE2_RULES_LIST.slice(0);
}

export function phase2(program, fdata, rulesListState, resolve, req, passes, phase1s, verboseTracing, prng, options) {
  const ast = fdata.tenkoOutput.ast;
  group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');
  if (VERBOSE_TRACING) {
    currentState(fdata, 'phase2', true, fdata);
    groupEnd();
    group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');
  }

  {
    const {prngSeed, implicitThisIdent, time, ...rest} = options;
    const keys = Object.keys(rest);
    ASSERT(keys.length === 0, 'phase 2 should not receive these options or this should be updated', keys);
  }

  assertNoDupeNodes(ast, 'body');

  vlog('Phase 2 options:', options);
  const r = _phase2(fdata, rulesListState, prng, options);
  groupEnd();

  // For phase1 it should have unique nodes/pids
  if (r?.next === 'phase1') assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');

  return r;
}
function _phase2(fdata, rulesListState, prng, options = {prngSeed: 1}) {
  // Initially we only care about bindings whose writes have one var decl and only assignments otherwise
  // Due to normalization, the assignments will be a statement. The var decl can not contain an assignment as init.
  // Elimination of var decls or assignments will be deferred. This way we can preserve parent/node
  // relationships which might otherwise break. This means a binding may have been removed from the books
  // even though it's technically still part of the AST. But since we take the books as leading in this step
  // that should not be a problem.

  // Track time spent per func, globally
  const GLO_TIMES = new Map(rulesListState.map(([key]) => [key, {calls: 0, hits: 0, time: 0, last: 0}]))

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    // TODO: can this be moved to phase1 as well? or is it going to break phase1_1 heuristics?
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
  });

  // Apply the next eligible rule until one applies a change or the last one is called
  let action;
  let ti = 0;
  let max = rulesListState.length;
  for (; ti<max;) {
    const [tname, tfunc] = rulesListState[0];
    const mnow = options.time && performance.now();
    action = tfunc(fdata, prng, options);
    const mtime = options.time && performance.now();
    const mlen = mtime-mnow;
    if (options.time) {
      let obj = GLO_TIMES.get(tname);
      if (!obj) GLO_TIMES.set(tname, obj = {calls: 0, hits: 0, time: 0, last: 0});
      obj.last = mlen;
      obj.time += mlen;
      obj.calls += 1;
    }
    rulesListState.push(rulesListState.shift()); // rotate
    if (action) {
      action.actionOrderIndex = ti;
      action.actionOwnTime = options.time ? under(mlen) : '--';
      break;
    }
    ti += 1;
  }

  vlog('\n\nEnd of phase2. Rules processed:', ti + 1, ', max:', max,', result:', action);
  if (options.time) {
    const obj = {};
    rulesListState.slice(-(ti+1)).forEach(([key]) => obj[key] = under(GLO_TIMES.get(key)?.last * 1000));
    console.log(DIM + 'Phase2   timing:',
      JSON.stringify(obj)
      .replace(/"/g, '')
      .replace(/([:,])/g, '$1 ')
      .replace(/([a-z]{3})\w+/ig, '$1'),
      RESET
    );
  }

  ASSERT(action === false || action === undefined || (action && typeof action === 'object'), 'transform rules must return an object or undefined', action, ', last:', rulesListState[rulesListState.length-1][0]);
  if (action === false) console.log('rule', [rulesListState[rulesListState.length-1][0]], 'returned false...');
  if (!action) {
    vlog('Phase 2 applied no rules, no changes');
    return;
  }

  ASSERT(typeof action.what === 'string', 'actionwhat should be string', action);
  ASSERT(typeof action.changes === 'number' && action.changes > 0, 'changes is number?', action);
  ASSERT(action.next === 'phase1' || action.next === 'normal', 'next should be phase1 or normal', action);

  return action;
}

function under(num) {
  const str = String(Math.round(num));
  let result = str.slice(0, str.length % 3 || 3);
  for (let i=result.length; i<str.length; i += 3) {
    result += '_' + str.slice(i, i+3);
  }
  return result;

}
