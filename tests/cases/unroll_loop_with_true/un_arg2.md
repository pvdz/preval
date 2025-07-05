# Preval test case

# un_arg2.md

> Unroll loop with true > Un arg2
>
>

## Input

`````js filename=intro
const x = +$LOOP_NO_UNROLLS_LEFT;
$(x);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = 1;
$(x);
`````


## Todos triggered


- (todo) this implies a bug and we should prevent it; m


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
