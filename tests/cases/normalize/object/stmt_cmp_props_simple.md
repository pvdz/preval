# Preval test case

# stmt_cmp_props_simple.md

> Normalize > Object > Stmt cmp props simple
>
> Objects as statement should be eliminated

## Input

`````js filename=intro
({['x']: 1, y: 2});
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


## Normalized
(This is what phase1 received the first time)

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
