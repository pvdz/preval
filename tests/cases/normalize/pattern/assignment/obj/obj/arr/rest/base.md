# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({
  x: {
    y: [...z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 });
$(z);
`````

## Settled


`````js filename=intro
z = [1, 2, 3];
$(z);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
z = [1, 2, 3];
$(z);
`````

## Pre Normal


`````js filename=intro
({
  x: {
    y: [...z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 });
$(z);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = [1, 2, 3];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault$1];
z = arrPatternSplat.slice(0);
$(z);
`````

## PST Settled
With rename=true

`````js filename=intro
z = [ 1, 2, 3 ];
$( z );
`````

## Globals

BAD@! Found 1 implicit global bindings:

z

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
