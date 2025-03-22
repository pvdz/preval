# Preval test case

# obj_obj.md

> Normalize > Pattern > Binding > Base no def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z}}} = 1;
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


## PST Settled
With rename=true

`````js filename=intro
const a = (1).x;
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
