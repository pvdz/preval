# Preval test case

# number_math_abs_nan_infinity.md

> Math > Ai > Number math abs nan infinity
>
> Math.abs with NaN and Infinity

## Input

`````js filename=intro
const a = $(Math.abs(NaN));
const b = $(Math.abs(Infinity));
const c = $(Math.abs(-Infinity));
$(a);
$(b);
$(c);
// Should be NaN, Infinity, Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const c /*:unknown*/ = $($Number_POSITIVE_INFINITY);
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
const b = $($Number_POSITIVE_INFINITY);
const c = $($Number_POSITIVE_INFINITY);
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( $Number_POSITIVE_INFINITY );
const c = $( $Number_POSITIVE_INFINITY );
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
let tmpCalleeParam = NaN;
const a = $($Number_NaN);
const tmpMCF$1 = $Math_abs;
let tmpCalleeParam$1 = $Number_POSITIVE_INFINITY;
const b = $($Number_POSITIVE_INFINITY);
const tmpMCF$3 = $Math_abs;
let tmpCalleeParam$3 = $Number_POSITIVE_INFINITY;
const c = $($Number_POSITIVE_INFINITY);
$(a);
$(b);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: Infinity
 - 3: Infinity
 - 4: NaN
 - 5: Infinity
 - 6: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
