# Preval test case

# obj_obj.md

> Normalize > Pattern > Param > Base no def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z}}}) { return z }
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
