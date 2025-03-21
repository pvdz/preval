# Preval test case

# obj_empty.md

> Normalize > Pattern > Assignment > Base no def > Obj empty
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ } = 1);
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
