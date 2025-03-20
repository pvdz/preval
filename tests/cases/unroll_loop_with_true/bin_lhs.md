# Preval test case

# bin_lhs.md

> Unroll loop with true > Bin lhs
>
>

## Input

`````js filename=intro
const x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE + 1;
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
