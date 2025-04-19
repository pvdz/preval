# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Param > Obj > Obj > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'bad';
}
$(f(0, 10));
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
let tmpObjPatternCrashTest /*:boolean*/ = tmpOPND === undefined;
if (tmpObjPatternCrashTest) {
} else {
  tmpObjPatternCrashTest = tmpOPND === null;
}
if (tmpObjPatternCrashTest) {
  tmpOPND.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $Number_prototype.x;
let tmpObjPatternCrashTest = tmpOPND === undefined;
if (!tmpObjPatternCrashTest) {
  tmpObjPatternCrashTest = tmpOPND === null;
}
if (tmpObjPatternCrashTest) {
  tmpOPND.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
let b = a === undefined;
if (b) {

}
else {
  b = a === null;
}
if (b) {
  a.cannotDestructureThis;
  $( "bad" );
}
else {
  $( "bad" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
