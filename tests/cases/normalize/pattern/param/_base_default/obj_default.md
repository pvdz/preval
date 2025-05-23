# Preval test case

# obj_default.md

> Normalize > Pattern > Param > Base default > Obj default
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

Regression was causing infinite loop

## Input

`````js filename=intro
function f({} = 1) {
}
f();
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

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
    tmpBindingPatternObjRoot = 1;
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
    return undefined;
  } else {
    return undefined;
  }
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
