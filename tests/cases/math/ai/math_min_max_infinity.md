# Preval test case

# math_min_max_infinity.md

> Math > Ai > Math min max infinity
>
> Math.min and Math.max with Infinity and -Infinity

## Input

`````js filename=intro
const a = $(Math.min(1, Infinity, -Infinity));
const b = $(Math.max(1, Infinity, -Infinity));
const c = $(Math.min(Infinity, Infinity));
const d = $(Math.max(-Infinity, -Infinity));
$(a);
$(b);
$(c);
$(d);
// Should be -Infinity, Infinity, Infinity, -Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
const b /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const c /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const d /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NEGATIVE_INFINITY);
const b = $($Number_POSITIVE_INFINITY);
const c = $($Number_POSITIVE_INFINITY);
const d = $($Number_NEGATIVE_INFINITY);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NEGATIVE_INFINITY );
const b = $( $Number_POSITIVE_INFINITY );
const c = $( $Number_POSITIVE_INFINITY );
const d = $( $Number_NEGATIVE_INFINITY );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_min;
let tmpCalleeParam = $Number_NEGATIVE_INFINITY;
const a = $($Number_NEGATIVE_INFINITY);
const tmpMCF$1 = $Math_max;
let tmpCalleeParam$1 = $Number_POSITIVE_INFINITY;
const b = $($Number_POSITIVE_INFINITY);
const tmpMCF$3 = $Math_min;
let tmpCalleeParam$3 = $Number_POSITIVE_INFINITY;
const c = $($Number_POSITIVE_INFINITY);
const tmpMCF$5 = $Math_max;
let tmpCalleeParam$5 = $Number_NEGATIVE_INFINITY;
const d = $($Number_NEGATIVE_INFINITY);
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
 - 1: -Infinity
 - 2: Infinity
 - 3: Infinity
 - 4: -Infinity
 - 5: -Infinity
 - 6: Infinity
 - 7: Infinity
 - 8: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
