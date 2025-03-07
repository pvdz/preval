# Preval test case

# class_expr_stmt_anon.md

> Normalize > Class > Class expr stmt anon
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

## Input

`````js filename=intro
(class {});
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
(class {});
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
