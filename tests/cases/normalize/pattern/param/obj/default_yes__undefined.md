# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Obj > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f(undefined, 10));
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpBindingPatternObjRoot /*:unknown*/ = $(`pass`);
let tmpClusterSSA_tmpObjPatternCrashTest /*:boolean*/ = tmpClusterSSA_tmpBindingPatternObjRoot === undefined;
if (tmpClusterSSA_tmpObjPatternCrashTest) {
} else {
  tmpClusterSSA_tmpObjPatternCrashTest = tmpClusterSSA_tmpBindingPatternObjRoot === null;
}
if (tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpClusterSSA_tmpBindingPatternObjRoot.cannotDestructureThis;
  $(`ok`);
} else {
  $(`ok`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpBindingPatternObjRoot = $(`pass`);
let tmpClusterSSA_tmpObjPatternCrashTest = tmpClusterSSA_tmpBindingPatternObjRoot === undefined;
if (!tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpClusterSSA_tmpObjPatternCrashTest = tmpClusterSSA_tmpBindingPatternObjRoot === null;
}
if (tmpClusterSSA_tmpObjPatternCrashTest) {
  tmpClusterSSA_tmpBindingPatternObjRoot.cannotDestructureThis;
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
  let tmpBindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    tmpBindingPatternObjRoot = $(`pass`);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpObjPatternCrashTest = tmpBindingPatternObjRoot === undefined;
  if (tmpObjPatternCrashTest) {
  } else {
    tmpObjPatternCrashTest = tmpBindingPatternObjRoot === null;
  }
  if (tmpObjPatternCrashTest) {
    tmpObjPatternCrashTest = tmpBindingPatternObjRoot.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
let tmpCalleeParam = f(undefined, 10);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
