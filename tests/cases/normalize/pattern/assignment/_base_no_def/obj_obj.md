# Preval test case

# obj_obj.md

> Normalize > Pattern > Assignment > Base no def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10, y = 20, z = 30;
({x: {y: {z}}} = 1);
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternNoDefault$1 /*:unknown*/ = objPatternNoDefault.y;
objPatternNoDefault$1.z;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).x.y.z;
`````

## Pre Normal


`````js filename=intro
let x = 10,
  y = 20,
  z = 30;
({
  x: {
    y: { z: z },
  },
} = 1);
`````

## Normalized


`````js filename=intro
let x = 10;
let y = 20;
let z = 30;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
z = objPatternNoDefault$1.z;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = a.y;
b.z;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
