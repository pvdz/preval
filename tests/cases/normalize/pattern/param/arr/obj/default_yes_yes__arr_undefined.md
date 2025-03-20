# Preval test case

# default_yes_yes__arr_undefined.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'ok';
}
$(f([undefined, 20, 30], 200));
`````


## Settled


`````js filename=intro
const arrPatternStep /*:unknown*/ = $(`fail`);
let objPatternCrashTest /*:boolean*/ = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  arrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arrPatternStep = $(`fail`);
let objPatternCrashTest = arrPatternStep === undefined;
if (!objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  arrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "fail" );
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


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'fail'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
