# Preval test case

# default_yes__empty_str.md

> Normalize > Pattern > Param > Obj > Default yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f('', 10));
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
let tmpCalleeParam = f(``, 10);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
