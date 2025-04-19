# Preval test case

# obj_obj.md

> Normalize > Pattern > Binding > Base alias > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z: a}}} = 1
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpOPND$1 /*:unknown*/ = tmpOPND.y;
tmpOPND$1.z;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.x.y.z;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
const b = a.y;
b.z;
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
