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
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpOPND$1 /*:unknown*/ = tmpOPND.y;
z = tmpOPND$1.z;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
z = $Number_prototype.x.y.z;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
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
