# Preval test case

# isfinite_50xyz.md

> Normalize > Builtins > Globals with primitives > Isfinite 50xyz
>
> Calling isFinite on a primitive should resolve

This is different from `parseInt`...

## Input

`````js filename=intro
$(isFinite("50xyz"));
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = false;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
