# Preval test case

# number_50xyz.md

> Normalize > Builtins > Globals with primitives > Number 50xyz
>
> Calling Number on a primitive should resolve

This is different from `parseInt`...

## Input

`````js filename=intro
$(Number("50xyz"));
`````


## Settled


`````js filename=intro
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
