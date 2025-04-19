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
const objPatternNoDefault /*:unknown*/ = $Number_prototype.x;
const objPatternNoDefault$1 /*:unknown*/ = objPatternNoDefault.y;
a = objPatternNoDefault$1.z;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a = $Number_prototype.x.y.z;
`````


## PST Settled
With rename=true

`````js filename=intro
const b = $Number_prototype.x;
const c = b.y;
a = c.z;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

a


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
