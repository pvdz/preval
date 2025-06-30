# Preval test case

# default_no_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Obj > Default no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: {} } = { x: undefined, b: 11, c: 12 };
$('bad');
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
const tmpBindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
let tmpObjPatternCrashTest = tmpOPND === undefined;
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpOPND === null;
}
if (tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpOPND.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?
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
