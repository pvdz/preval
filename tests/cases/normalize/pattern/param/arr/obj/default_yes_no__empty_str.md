# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Param > Arr > Obj > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{} = $('pass')]) {
  return 'ok';
}
$(f('', 100));
`````


## Settled


`````js filename=intro
const tmpSSA_tmpArrPatternStep /*:unknown*/ = $(`pass`);
let tmpSSA_tmpObjPatternCrashTest /*:boolean*/ = tmpSSA_tmpArrPatternStep === undefined;
if (tmpSSA_tmpObjPatternCrashTest) {
} else {
  tmpSSA_tmpObjPatternCrashTest = tmpSSA_tmpArrPatternStep === null;
}
if (tmpSSA_tmpObjPatternCrashTest) {
  tmpSSA_tmpArrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_tmpArrPatternStep = $(`pass`);
let tmpSSA_tmpObjPatternCrashTest = tmpSSA_tmpArrPatternStep === undefined;
if (!tmpSSA_tmpObjPatternCrashTest) {
  tmpSSA_tmpObjPatternCrashTest = tmpSSA_tmpArrPatternStep === null;
}
if (tmpSSA_tmpObjPatternCrashTest) {
  tmpSSA_tmpArrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
let b = a === undefined;
if (b) {

}
else {
  b = a === null;
}
if (b) {
  a.cannotDestructureThis;
  $( "ok" );
}
else {
  $( "ok" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpAPBD = tmpArrPatternSplat[0];
  let tmpArrPatternStep = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    tmpArrPatternStep = $(`pass`);
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
let tmpCalleeParam = f(``, 100);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
