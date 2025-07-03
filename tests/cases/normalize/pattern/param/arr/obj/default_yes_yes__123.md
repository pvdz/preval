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
const tmpCalleeParam /*:array*/ /*truthy*/ = [`fail2`];
const tmpClusterSSA_tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpClusterSSA_tmpBindingPatternArrRoot];
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
const tmpClusterSSA_tmpBindingPatternArrRoot = $([`fail2`]);
const tmpAPBD = [...tmpClusterSSA_tmpBindingPatternArrRoot][0];
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
let tmpCalleeParam$1 = f(undefined, 100);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
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
