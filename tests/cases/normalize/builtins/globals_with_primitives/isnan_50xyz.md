# Preval test case

# isnan_50xyz.md

> Normalize > Builtins > Globals with primitives > Isnan 50xyz
>
> Calling isNaN on a value that is a NaN should invariantly return true

This is different from `parseInt`...

## Input

`````js filename=intro
$(isNaN("50xyz"));
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = true;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
