# Preval test case

# obj_prop_key.md

> Unroll loop with true > Obj prop key
>
>

## Input

`````js filename=intro
const x = {[$LOOP_DONE_UNROLLING_ALWAYS_TRUE]: 'haha'};
$(x);
`````


## Settled


`````js filename=intro
const x /*:object*/ /*truthy*/ = { [true]: `haha` };
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [true]: `haha` });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ true ]: "haha" };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = { [true]: `haha` };
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { true: '"haha"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
