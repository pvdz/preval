import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat } from '../utils.mjs';
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
import { ifReduction } from './phase2ifreduction.mjs';
import { inlineCommonReturns } from './phase2commonreturn.mjs';
import { dropUnusedReturns } from './phase2unusedreturns.mjs';
import { singleScopeTdz } from './phase2single_scope_tdz.mjs';
import { letHoisting } from './phase2lethoisting.mjs';
import { ifelseifelse } from './phase2ifelseifelse.mjs';
import { staticLets } from './phase2staticlets.mjs';
import { assignHoisting } from './phase2assignhoisting.mjs';

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
  const r = _phase2(program, fdata, resolve, req);
  vlog('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
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
  });

  const tdzd = singleScopeTdz(fdata);
  if (tdzd) return tdzd;

  const moved = letHoisting(fdata);
  if (moved) return moved;

  const moved2 = assignHoisting(fdata);
  if (moved2) return moved2;

  const staticLetsInlined = staticLets(fdata);
  if (staticLetsInlined) return staticLetsInlined;

  const emptyFuncs = pruneEmptyFunctions(fdata);
  if (emptyFuncs) return emptyFuncs;

  const trampFuncs = pruneTrampolineFunctions(fdata);
  if (trampFuncs) return trampFuncs;

  const inlinedConstants = inlineConstants(fdata);
  if (inlinedConstants) return inlinedConstants;

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

  const deduced = ifReduction(fdata);
  if (deduced) return deduced;

  // The read/write data should still be in tact at this point
}
