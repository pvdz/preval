import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat } from '../utils.mjs';
import { mergeTyping } from '../bindings.mjs';
import { pruneEmptyFunctions } from './phase2emptyfunc.mjs';
import { pruneTrampolineFunctions } from './phase2trampoline.mjs';
import { pruneExcessiveParams } from './phase2exparam.mjs';
import { inlineConstants } from './phase2inlineconstants.mjs';
import { multiScopeSSA } from './phase2multi_scope_ssa.mjs';
import { singleScopeSSA } from './phase2single_scope_ssa.mjs';
import { inlineSimpleFuncCalls } from './phase2simplefuncs.mjs';
import { inlineOneTimeFunctions } from './phase2onetimers.mjs';
import { funcScopePromo } from './phase2funcscopepromo.mjs';
import { dedupeBranchedReturns } from './phase2deduperetbranch.mjs';
import { inlineCommonReturns } from './phase2commonreturn.mjs';
import { dropUnusedReturns } from './phase2unusedreturns.mjs';
import { singleScopeTdz } from './phase2single_scope_tdz.mjs';
import { letHoisting } from './phase2lethoisting.mjs';
import { ifelseifelse } from './phase2ifelseifelse.mjs';
import { staticLets } from './phase2staticlets.mjs';
import { dealiasing } from './phase2dealiasing.mjs';
import { ifCallIf } from './phase2ifcallif.mjs';
import { assignHoisting } from './phase2assignhoisting.mjs';
import { arrrrrr } from './phase2arrrr.mjs';
import { constAssigns } from './phase2const_assigns.mjs';
import { ifTailExtending } from './phase2if_tail_extending.mjs';
import { ifFlipping } from './phase2if_flip.mjs';
import { objlitPropAccess } from './phase2objlit_prop.mjs';
import { bitSetTests } from './phase2bit_set_test.mjs';
import { ifUpdateCall } from './phase2if_update_call.mjs';
import { inlineArgLen } from './phase2inline_arguments_length.mjs';
import { inlineIdenticalParam } from './phase2inline_identical_param.mjs';
import { returnClosure } from './phase2return_closure.mjs';
import { returnArg } from './phase2return_arg.mjs';
import { constWhileTest } from './phase2const_while_test.mjs';
import { typeTrackedTricks } from './phase2type_tracked_tricks.mjs';
import { arrSpreads } from './phase2arr_spread.mjs';
import { conditionalTyping } from './phase2conditional_typing.mjs';
import { findThrowers } from './phase2throwers.mjs';
import { ifReturnBit } from './phase2if_return_bit.mjs';
import { returnsParam } from './phase2return_param.mjs';
import { ifTestBool } from './phase2if_test_bool.mjs';
import { spylessVars } from './phase2spyless_vars.mjs';
import { ifTestFolding } from './phase2if_test_folding.mjs';
import { stringFusing } from './phase2string_fusing.mjs';
import { andCases } from './phase2and_cases.mjs';
import { globalCasting } from './phase2global_casting.mjs';
import { binExprStmt } from './phase2bin_expr_stmt.mjs';
import { propertyLookups } from './phase2property_lookups.mjs';
import { letIfElse } from './phase2let_if_else.mjs';
import { coercials } from './phase2coerced.mjs';
import { redundantWrites } from './phase2redundant_if_else_writes.mjs';

//import { phasePrimitiveArgInlining } from './phase_primitive_arg_inlining.mjs';

// Things to do
// - Inline local constants, numbers, literal idents
// - Inline imported constants
// - Unroll a function when called with a primitive
// - Branch out
// - Const binding folding (const a = $(); const b = a; -> redundant)
// - Unary negative/positive should look at argument

export function phase2(program, fdata, resolve, req) {
  const ast = fdata.tenkoOutput.ast;
  group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');
  vlog('\nCurrent state (before phase2)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
  vlog('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');
  const r = _phase2(program, fdata, resolve, req);
  groupEnd();
  return r;
}
function _phase2(program, fdata, resolve, req) {
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
          mergeTyping(meta2, meta);
        }
      }
    }

    // We can also settle this in phase1...
    let lastScope = undefined;
    //let lastScopeRead = undefined;
    //let lastScopeWrite = undefined;
    meta.singleScoped = true;
    //meta.singleScopeReads = true;
    //meta.singleScopeWrites = true;
    rwOrder.some((ref) => {
      if (lastScope === undefined) lastScope = ref.scope;
      else if (lastScope !== ref.scope) meta.singleScoped = false;

      //if (ref.type === 'read') {
      //  if (lastScopeRead === undefined) lastScopeRead = ref.scope;
      //  else if (lastScopeRead !== ref.scope) meta.singleScopeReads = false;
      //}
      //if (ref.type === 'write') {
      //  if (lastScopeWrite === undefined) lastScopeWrite = ref.scope;
      //  else if (lastScopeWrite !== ref.scope) meta.singleScopeWrites = false;
      //}
      //return +meta.singleScopeReads + +meta.singleScopeWrites === 0;

      return !meta.singleScoped;
    });
  });

  const coerced = coercials(fdata);
  if (coerced) return coerced;

  const throwers = findThrowers(fdata);
  if (throwers) return throwers;

  const tdzd = singleScopeTdz(fdata);
  if (tdzd) return tdzd;

  const consts = constAssigns(fdata);
  if (consts) return consts;

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

  const ifbits = ifReturnBit(fdata);
  if (ifbits) return ifbits;

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

  // This one is very invasive and expands the code. Needs more work.
  // const duped = phasePrimitiveArgInlining(program, fdata, resolve, req, options.cloneLimit);
  // if (duped) return duped;

  // The read/write data should still be in tact at this point
}
