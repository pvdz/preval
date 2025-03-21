# Preval test case

# delete.md

> Obj mutation > Delete
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'bloop'};
delete blob.thing;
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
