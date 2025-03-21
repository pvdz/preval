# Preval test case

# counter_update_infinity.md

> Unwind loops > Separate test > Counter update infinity
>
> Unrolling loops

## Input

`````js filename=intro
const max = $(10);
for (let i=0; i<10; i += Infinity) $(i);
`````


## Settled


`````js filename=intro
$(10);
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 0 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
