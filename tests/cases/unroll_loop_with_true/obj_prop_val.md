# Preval test case

# obj_prop_val.md

> Unroll loop with true > Obj prop val
>
>

## Input

`````js filename=intro
const x = {joke: $LOOP_DONE_UNROLLING_ALWAYS_TRUE};
$(x);
`````


## Settled


`````js filename=intro
const x /*:object*/ /*truthy*/ = { joke: true };
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ joke: true });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { joke: true };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = { joke: true };
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { joke: 'true' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
