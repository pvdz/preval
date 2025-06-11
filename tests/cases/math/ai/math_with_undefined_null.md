# Preval test case

# math_with_undefined_null.md

> Math > Ai > Math with undefined null
>
> Math with undefined and null arguments

## Input

`````js filename=intro
const a = $(Math.max(undefined, 1));
const b = $(Math.min(null, 1));
$(a);
$(b);
// Should be NaN, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $(0);
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
const b = $(0);
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( 0 );
$( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_max;
let tmpCalleeParam = NaN;
const a = $($Number_NaN);
const tmpMCF$1 = $Math_min;
let tmpCalleeParam$1 = 0;
const b = $(tmpCalleeParam$1);
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
 - 2: 0
 - 3: NaN
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
