# Preval test case

# math_min_max_with_undefined.md

> Math > Ai > Math min max with undefined
>
> Math.min and Math.max with undefined

## Input

`````js filename=intro
const a = $(Math.min(undefined, 1));
const b = $(Math.max(undefined, 1));
$(a);
$(b);
// Both should be NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $($Number_NaN);
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
const b = $($Number_NaN);
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( $Number_NaN );
$( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_min;
let tmpCalleeParam = NaN;
const a = $($Number_NaN);
const tmpMCF$1 = $Math_max;
let tmpCalleeParam$1 = NaN;
const b = $($Number_NaN);
$(a);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
