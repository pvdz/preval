# Preval test case

# stmt_hoisted.md

> Normalize > Identifier > Stmt hoisted
>
> Hoisted global statement should be eliminated

## Input

`````js filename=intro
x;
var x = 10;
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
let x = undefined;
null;
x = 10;
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 10;
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
