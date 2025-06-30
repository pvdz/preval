# Preval test case

# default_yes_yes__obj_undefined3.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  obj undefined3
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {}  }) {
  return 'ok';
}
f({ x: null });
`````


## Settled


`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
null.cannotDestructureThis;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
null.cannotDestructureThis;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpObjPatternCrashTest = tmpOPND === undefined;
  if (tmpObjPatternCrashTest) {
  } else {
    tmpObjPatternCrashTest = tmpOPND === null;
  }
  if (tmpObjPatternCrashTest) {
    tmpObjPatternCrashTest = tmpOPND.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam = { x: null };
f(tmpCalleeParam);
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
