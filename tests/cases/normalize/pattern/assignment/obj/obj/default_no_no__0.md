# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Assignment > Obj > Obj > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: {} } = 0);
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (0).x;
let objPatternCrashTest /*:boolean*/ = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = (0).x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (!objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Pre Normal


`````js filename=intro
({
  x: {},
} = 0);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 0;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
