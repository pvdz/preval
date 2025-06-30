# Preval test case

# default_no_no__arr_null.md

> Normalize > Pattern > Param > Arr > Obj > Default no no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{}]) {
  return 'ok';
}
$(f([null, 20, 30], 200));
`````


## Settled


`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
null.cannotDestructureThis;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpArrPatternStep = tmpArrPatternSplat[0];
  let tmpObjPatternCrashTest = tmpArrPatternStep === undefined;
  if (tmpObjPatternCrashTest) {
  } else {
    tmpObjPatternCrashTest = tmpArrPatternStep === null;
  }
  if (tmpObjPatternCrashTest) {
    tmpObjPatternCrashTest = tmpArrPatternStep.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = [null, 20, 30];
let tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) property on nullable; unreachable or hard error?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
