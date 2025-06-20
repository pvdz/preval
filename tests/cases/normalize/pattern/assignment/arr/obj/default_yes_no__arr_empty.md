# Preval test case

# default_yes_no__arr_empty.md

> Normalize > Pattern > Assignment > Arr > Obj > Default yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{} = $('pass')] = []);
$('ok');
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpArrPatternStep /*:unknown*/ = $(`pass`);
let tmpClusterSSA_tmpObjPatternCrashTest /*:boolean*/ = tmpClusterSSA_tmpArrPatternStep === undefined;
if (tmpClusterSSA_tmpObjPatternCrashTest) {
} else {
  tmpClusterSSA_tmpObjPatternCrashTest = tmpClusterSSA_tmpArrPatternStep === null;
}
if (tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpClusterSSA_tmpArrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpArrPatternStep = $(`pass`);
let tmpClusterSSA_tmpObjPatternCrashTest = tmpClusterSSA_tmpArrPatternStep === undefined;
if (!tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpClusterSSA_tmpObjPatternCrashTest = tmpClusterSSA_tmpArrPatternStep === null;
}
if (tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpClusterSSA_tmpArrPatternStep.cannotDestructureThis;
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
const tmpArrAssignPatternRhs = [];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpAPBD = tmpArrPatternSplat[0];
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
  $(`ok`);
} else {
  $(`ok`);
}
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
