# Preval test case

# if_infinity.md

> Ifelse > Simple > If infinity
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (Infinity) $();
`````


## Settled


`````js filename=intro
$();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
`````


## PST Settled
With rename=true

`````js filename=intro
$();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
