# Preval test case

# stmt_reg_props_simple_and_rest.md

> Normalize > Object > Stmt reg props simple and rest
>
> Objects as statement should be eliminated

## Input

`````js filename=intro
({x: 1, y: 2, ...{a: 10}});
`````


## Settled


`````js filename=intro
const tmpObjSpreadArg /*:object*/ /*truthy*/ = { a: 10 };
({ ...tmpObjSpreadArg });
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpreadArg = { a: 10 };
({ ...tmpObjSpreadArg });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 10 };
{ ... a };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjSpreadArg = { a: 10 };
({ ...tmpObjSpreadArg });
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
