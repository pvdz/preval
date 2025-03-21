# Preval test case

# base.md

> Normalize > Builtins > Math > Pow > Base
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3, 8));
`````


## Settled


`````js filename=intro
$(6561);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6561);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6561 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6561
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
