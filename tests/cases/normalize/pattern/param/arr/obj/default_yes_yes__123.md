# Preval test case

# default_yes_yes__123.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{} = $('pass')] = $(['fail2'])) {
  return 'ok';
}
$(f(undefined, 100));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`fail2`];
const tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
let tmpArrPatternStep /*:unknown*/ /*ternaryConst*/ = undefined;
let tmpObjPatternCrashTest /*:boolean*/ = false;
const tmpIfTest$1 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$1) {
  tmpArrPatternStep = $(`pass`);
  tmpObjPatternCrashTest = tmpArrPatternStep === undefined;
} else {
  tmpArrPatternStep = tmpAPBD;
}
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpArrPatternStep === null;
}
if (tmpObjPatternCrashTest) {
  tmpArrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = $([`fail2`]);
const tmpAPBD = [...tmpBindingPatternArrRoot][0];
let tmpArrPatternStep = undefined;
let tmpObjPatternCrashTest = false;
if (tmpAPBD === undefined) {
  tmpArrPatternStep = $(`pass`);
  tmpObjPatternCrashTest = tmpArrPatternStep === undefined;
} else {
  tmpArrPatternStep = tmpAPBD;
}
if (!tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpArrPatternStep === null;
}
if (tmpObjPatternCrashTest) {
  tmpArrPatternStep.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "fail2" ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
let e = undefined;
let f = false;
const g = d === undefined;
if (g) {
  e = $( "pass" );
  f = e === undefined;
}
else {
  e = d;
}
if (f) {

}
else {
  f = e === null;
}
if (f) {
  e.cannotDestructureThis;
  $( "ok" );
}
else {
  $( "ok" );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['fail2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
