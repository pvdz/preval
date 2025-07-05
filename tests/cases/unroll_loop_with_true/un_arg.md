# Preval test case

# un_arg.md

> Unroll loop with true > Un arg
>
>

## Input

`````js filename=intro
const x = typeof $LOOP_NO_UNROLLS_LEFT;
$(x);
`````


## Settled


`````js filename=intro
$(`boolean`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`boolean`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "boolean" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = `boolean`;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
