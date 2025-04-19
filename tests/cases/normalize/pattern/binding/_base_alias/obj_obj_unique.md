# Preval test case

# obj_obj_unique.md

> Normalize > Pattern > Binding > Base alias > Obj obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
const {x: {y: {z: a}}} = 1
{ let a = 1; }
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
