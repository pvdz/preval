# Preval test case

# stmt_no_expr.md

> Normalize > Expressions > Assignments > Template > Stmt no expr
>
> A template that is a statement should be eliminated

## Input

`````js filename=intro
`foo`;
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
`foo`;
`````

## Normalized


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
