# Preval test case

# var_end.md

> Normalize > Sequence > Var end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
const a = (1, 2, (3, 4));
$(a);
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
