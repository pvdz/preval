# Preval test case

# number_math_min_max_nan.md

> Math > Ai > Number math min max nan
>
> Math.min and Math.max with NaN and numbers

## Input

`````js filename=intro
const a = $(Math.min(1, NaN, 2));
const b = $(Math.max(1, NaN, 2));
const c = $(Math.min(1, 2, 3));
const d = $(Math.max(1, 2, 3));
$(a);
$(b);
$(c);
$(d);
// Should be NaN, NaN, 1, 3
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $($Number_NaN);
const c /*:unknown*/ = $(1);
const d /*:unknown*/ = $(3);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
const b = $($Number_NaN);
const c = $(1);
const d = $(3);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( $Number_NaN );
const c = $( 1 );
const d = $( 3 );
$( a );
$( b );
$( c );
$( d );
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
const tmpMCF$3 = $Math_min;
let tmpCalleeParam$3 = 1;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_max;
let tmpCalleeParam$5 = 3;
const d = $(tmpCalleeParam$5);
$(a);
$(b);
$(c);
$(d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - 3: 1
 - 4: 3
 - 5: NaN
 - 6: NaN
 - 7: 1
 - 8: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
