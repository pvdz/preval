# Preval test case

# number_infinity.md

> Normalize > Builtins > Globals with primitives > Number infinity
>
> Calling Number on a primitive should resolve

## Input

`````js filename=intro
$(Number(Infinity));
`````


## Settled


`````js filename=intro
$(Infinity);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Infinity);
`````


## PST Settled
With rename=true

`````js filename=intro
$( Infinity );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
