# Preval test case

# const_call_arg.md

> Unroll loop with true > Const call arg
>
>

## Input

`````js filename=intro
const x = $($LOOP_DONE_UNROLLING_ALWAYS_TRUE);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(true));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
$(x);
`````


## Todos triggered


- (todo) when does the loop unroll constant escape?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
