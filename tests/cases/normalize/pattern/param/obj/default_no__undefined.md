# Preval test case

# default_no__undefined.md

> Normalize > Pattern > Param > Obj > Default no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({}) {
  return 'bad';
}
$(f(undefined, 10));
`````


## Settled


`````js filename=intro
undefined.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.cannotDestructureThis;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpObjPatternCrashTest = tmpBindingPatternObjRoot === undefined;
  if (tmpObjPatternCrashTest) {
  } else {
    tmpObjPatternCrashTest = tmpBindingPatternObjRoot === null;
  }
  if (tmpObjPatternCrashTest) {
    tmpObjPatternCrashTest = tmpBindingPatternObjRoot.cannotDestructureThis;
    return `bad`;
  } else {
    return `bad`;
  }
};
let tmpCalleeParam = f(undefined, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
