# Preval test case

# var_start.md

> Normalize > Sequence > Var start
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
const a = ((3, 4), 5, 6);
$(a);
`````


## Settled


`````js filename=intro
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = 6;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
