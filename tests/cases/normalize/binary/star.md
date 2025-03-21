# Preval test case

# star.md

> Normalize > Binary > Star
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 * 3);
`````


## Settled


`````js filename=intro
$(15);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(15);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 15 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
