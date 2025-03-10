# Preval test case

# default_no_no__obj_null.md

> Normalize > Pattern > Assignment > Obj > Obj > Default no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: {} } = { x: null, b: 11, c: 12 });
$('bad');
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

## Pre Normal


`````js filename=intro
({
  x: {},
} = { x: null, b: 11, c: 12 });
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: null, b: 11, c: 12 };
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
null.cannotDestructureThis;
throw "[Preval]: Can not reach here";
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
