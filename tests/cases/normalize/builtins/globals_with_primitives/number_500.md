# Preval test case

# number_500.md

> Normalize > Builtins > Globals with primitives > Number 500
>
> Calling Number on a primitive should resolve

## Input

`````js filename=intro
$(Number(500));
`````


## Settled


`````js filename=intro
$(500);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(500);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 500 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
