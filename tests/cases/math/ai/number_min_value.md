# Preval test case

# number_min_value.md

> Math > Ai > Number min value
>
> Number.MIN_VALUE and underflow to 0

## Input

`````js filename=intro
const a = $(Number.MIN_VALUE);
const b = a / 2;
$(a);
$(b);
// Should be 5e-324, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_MIN_VALUE);
const b /*:number*/ = a / 2;
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_MIN_VALUE);
const b = a / 2;
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_MIN_VALUE );
const b = a / 2;
$( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Number_MIN_VALUE;
const a = $($Number_MIN_VALUE);
const b = a / 2;
$(a);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5e-324
 - 2: 5e-324
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
