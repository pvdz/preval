# Preval test case

# arr_slice_redundant.md

> Tofix > arr slice redundant
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

Based on > Normalize > Pattern > Param > Obj > Arr > Rest > Default yes yes  missing

what's the point of a slicing a fresh array when the array is unused other than the slice

## Input

`````js filename=intro
const arrPatternSplat /*:array*/ = [...$([1,2,3])];
const y /*:array*/ = $dotCall($array_slice, arrPatternSplat, `slice`, 0);
$(y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2, 3];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpArrSpread];
const y /*:array*/ = $dotCall($array_slice, arrPatternSplat, `slice`, 0);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $([1, 2, 3]);
$($dotCall($array_slice, [...tmpArrSpread], `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = [ ...b ];
const d = $dotCall( $array_slice, c, "slice", 0 );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const tmpArrSpread = $(tmpCalleeParam);
const arrPatternSplat = [...tmpArrSpread];
const y = $dotCall($array_slice, arrPatternSplat, `slice`, 0);
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
