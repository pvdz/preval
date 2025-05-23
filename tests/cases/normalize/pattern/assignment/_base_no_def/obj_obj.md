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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 10;
let y = 20;
let z = 30;
const tmpAssignObjPatternRhs = 1;
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpOPND$1 = tmpOPND.y;
z = tmpOPND$1.z;
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
