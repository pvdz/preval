# Preval test case

# default_yes_yes__arr_obj_empty.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'ok';
}
$(f([{}, 20, 30], 200));
`````


## Settled


`````js filename=intro
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ok" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`fail2`];
    tmpBindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternArrRoot = tmpParamBare;
  }
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest$1 = tmpAPBD === undefined;
  if (tmpIfTest$1) {
    tmpArrPatternStep = $(`fail`);
  } else {
    tmpArrPatternStep = tmpAPBD;
  }
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
const tmpArrElement = {};
let tmpCalleeParam$3 = [tmpArrElement, 20, 30];
let tmpCalleeParam$1 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
