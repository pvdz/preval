# Preval test case

# number_division_by_zero.md

> Math > Ai > Number division by zero
>
> Division by zero and by -0

## Input

`````js filename=intro
const a = $(1 / 0);
const b = $(1 / -0);
const c = $(-1 / 0);
const d = $(-1 / -0);
$(a);
$(b);
$(c);
$(d);
// Should be Infinity, -Infinity, -Infinity, Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const b /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
const c /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
const d /*:unknown*/ = $($Number_POSITIVE_INFINITY);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_POSITIVE_INFINITY);
const b = $($Number_NEGATIVE_INFINITY);
const c = $($Number_NEGATIVE_INFINITY);
const d = $($Number_POSITIVE_INFINITY);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_POSITIVE_INFINITY );
const b = $( $Number_NEGATIVE_INFINITY );
const c = $( $Number_NEGATIVE_INFINITY );
const d = $( $Number_POSITIVE_INFINITY );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Number_POSITIVE_INFINITY;
const a = $($Number_POSITIVE_INFINITY);
let tmpCalleeParam$1 = $Number_NEGATIVE_INFINITY;
const b = $($Number_NEGATIVE_INFINITY);
let tmpCalleeParam$3 = $Number_NEGATIVE_INFINITY;
const c = $($Number_NEGATIVE_INFINITY);
let tmpCalleeParam$5 = $Number_POSITIVE_INFINITY;
const d = $($Number_POSITIVE_INFINITY);
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
 - 1: Infinity
 - 2: -Infinity
 - 3: -Infinity
 - 4: Infinity
 - 5: Infinity
 - 6: -Infinity
 - 7: -Infinity
 - 8: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
