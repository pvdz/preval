# Preval test case

# number_division_by_zero2.md

> Math > Ai > Number division by zero2
>
> Division by zero and by -0

## Input

`````js filename=intro
const a = $(1 / -0);
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($Number_NEGATIVE_INFINITY));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NEGATIVE_INFINITY );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Number_NEGATIVE_INFINITY;
const a = $($Number_NEGATIVE_INFINITY);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -Infinity
 - 2: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
