# Preval test case

# obj_arr.md

> Normalize > Pattern > Assignment > Base no def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10, y = 20;
({x: [ y ]} = 1)
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
[...tmpOPND];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $Number_prototype.x;
[...tmpOPND];
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
[ ...a ];
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 10;
let y = 20;
const tmpAssignObjPatternRhs = 1;
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpArrPatternSplat = [...tmpOPND];
y = tmpArrPatternSplat[0];
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
