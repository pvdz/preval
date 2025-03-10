# Preval test case

# obj_obj.md

> Normalize > Pattern > Binding > Base unique > Obj obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let z = 1; }
const {x: {y: {z}}} = 1;
{ let z = 1; }
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
{
  let z$1 = 1;
}
const {
  x: {
    y: { z: z },
  },
} = 1;
{
  let z$3 = 1;
}
`````

## Normalized


`````js filename=intro
let z$1 = 1;
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const z = objPatternNoDefault$1.z;
let z$3 = 1;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
