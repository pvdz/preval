# Preval test case

# math_reciprocal_zero.md

> Math > Ai > Math reciprocal zero
>
> Reciprocal of +0 and -0

## Input

`````js filename=intro
const a = $(1 / 0);
const b = $(1 / -0);
$(a);
$(b);
// Should be Infinity, -Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const b /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_POSITIVE_INFINITY);
const b = $($Number_NEGATIVE_INFINITY);
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_POSITIVE_INFINITY );
const b = $( $Number_NEGATIVE_INFINITY );
$( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Number_POSITIVE_INFINITY;
const a = $($Number_POSITIVE_INFINITY);
let tmpCalleeParam$1 = $Number_NEGATIVE_INFINITY;
const b = $($Number_NEGATIVE_INFINITY);
$(a);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - 2: -Infinity
 - 3: Infinity
 - 4: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
