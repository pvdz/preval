# Preval test case

# string_50xyz.md

> Normalize > Builtins > Globals with primitives > String 50xyz
>
> Calling String on a primitive should resolve

This is different from `parseInt`...

## Input

`````js filename=intro
$(String("50xyz"));
`````


## Settled


`````js filename=intro
$(`50xyz`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`50xyz`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "50xyz" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = `50xyz`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '50xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
