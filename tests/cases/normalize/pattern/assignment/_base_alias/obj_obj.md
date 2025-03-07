# Preval test case

# obj_obj.md

> Normalize > Pattern > Assignment > Base alias > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: {y: {z: a}}} = 1)
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternNoDefault$1 /*:unknown*/ = objPatternNoDefault.y;
a = objPatternNoDefault$1.z;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
a = (1).x.y.z;
`````

## Pre Normal


`````js filename=intro
({
  x: {
    y: { z: a },
  },
} = 1);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
a = objPatternNoDefault$1.z;
`````

## PST Settled
With rename=true

`````js filename=intro
const b = 1.x;
const c = b.y;
a = c.z;
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
