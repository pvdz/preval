# Preval test case

# obj_obj.md

> Normalize > Pattern > Assignment > Base unique > Obj obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let z = 1; }
({x: {y: {z}}} = 1);
{ let z = 1; }
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternNoDefault$1 /*:unknown*/ = objPatternNoDefault.y;
z = objPatternNoDefault$1.z;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
z = (1).x.y.z;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = a.y;
z = b.z;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

z


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
