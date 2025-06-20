# Preval test case

# obj_arr.md

> Normalize > Pattern > Assignment > Base unique > Obj arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let y = 1; }
({x: [ y ]} = 1);
{ let y = 1; }
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpOPND];
y = tmpArrPatternSplat[0];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $Number_prototype.x;
y = [...tmpOPND][0];
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
const b = [ ...a ];
y = b[ 0 ];
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y$3 = 1;
const tmpAssignObjPatternRhs = 1;
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpArrPatternSplat = [...tmpOPND];
y = tmpArrPatternSplat[0];
let y$1 = 1;
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
