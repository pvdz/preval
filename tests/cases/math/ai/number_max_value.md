# Preval test case

# number_max_value.md

> Math > Ai > Number max value
>
> Number.MAX_VALUE and overflow to Infinity

## Input

`````js filename=intro
const a = $(Number.MAX_VALUE);
const b = a * 2;
$(a);
$(b);
// Should be 1.7976931348623157e+308, Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_MAX_VALUE);
const b /*:number*/ = a * 2;
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_MAX_VALUE);
const b = a * 2;
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_MAX_VALUE );
const b = a * 2;
$( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Number_MAX_VALUE;
const a = $($Number_MAX_VALUE);
const b = a * 2;
$(a);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.7976931348623157e308
 - 2: 1.7976931348623157e308
 - 3: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
