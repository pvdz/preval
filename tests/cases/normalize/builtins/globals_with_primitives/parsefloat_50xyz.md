# Preval test case

# parsefloat_50xyz.md

> Normalize > Builtins > Globals with primitives > Parsefloat 50xyz
>
> Calling parseFloat on a primitive should resolve

This is different from `parseInt`...

## Input

`````js filename=intro
$(parseFloat("50xyz"));
`````


## Settled


`````js filename=intro
$(50);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(50);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 50 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
