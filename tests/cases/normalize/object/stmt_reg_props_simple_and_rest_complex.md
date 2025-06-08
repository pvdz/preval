# Preval test case

# stmt_reg_props_simple_and_rest_complex.md

> Normalize > Object > Stmt reg props simple and rest complex
>
> Objects as statement should be eliminated

## Input

`````js filename=intro
({x: 1, y: 2, ...{a: $(10)}});
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(10);
const tmpObjSpreadArg /*:object*/ /*truthy*/ = { a: tmpObjLitVal };
({ ...tmpObjSpreadArg });
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(10);
const tmpObjSpreadArg = { a: tmpObjLitVal };
({ ...tmpObjSpreadArg });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = { a: a };
{ ... b };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(10);
const tmpObjSpreadArg = { a: tmpObjLitVal };
({ ...tmpObjSpreadArg });
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
