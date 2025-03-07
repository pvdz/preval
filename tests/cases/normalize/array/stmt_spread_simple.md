# Preval test case

# stmt_spread_simple.md

> Normalize > Array > Stmt spread simple
>
> Array statements should be eliminated

## Input

`````js filename=intro
[...[10, 20], 2, ...[30, 40]];
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
[...[10, 20], 2, ...[30, 40]];
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
