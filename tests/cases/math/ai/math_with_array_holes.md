# Preval test case

# math_with_array_holes.md

> Math > Ai > Math with array holes
>
> Math.min with array containing holes

## Input

`````js filename=intro
const arr = [1, , 3];
const a = $(Math.min(...arr));
$(a);
// Should be NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($Number_NaN));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, , 3];
const tmpMCF = $Math_min;
let tmpCalleeParam = $Math_min(...arr);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_min


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
