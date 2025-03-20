# Preval test case

# stmt_reg_props_simple.md

> Normalize > Object > Stmt reg props simple
>
> Objects as statement should be eliminated

## Input

`````js filename=intro
({x: 1, y: 2});
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
