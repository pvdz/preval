# Preval test case

# bin_rhs.md

> Unroll loop with true > Bin rhs
>
>

## Input

`````js filename=intro
const x = 1 + $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
$(x);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
