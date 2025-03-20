# Preval test case

# un_arg2.md

> Unroll loop with true > Un arg2
>
>

## Input

`````js filename=intro
const x = +$LOOP_DONE_UNROLLING_ALWAYS_TRUE;
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
