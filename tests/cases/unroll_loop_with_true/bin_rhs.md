# Preval test case

# bin_rhs.md

> Unroll loop with true > Bin rhs
>
>

## Input

`````js filename=intro
const x = 1 + $LOOP_NO_UNROLLS_LEFT;
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = 2;
$(x);
`````


## Todos triggered


- (todo) this implies a bug and we should prevent it; e


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
