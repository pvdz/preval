# Preval test case

# statement.md

> Normalize > Ternary > Statement
>
> A statement that is a ternary should be an if-else

## Input

`````js filename=intro
var a, b, c;
a ? b : c;
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
let a = undefined;
let b = undefined;
let c = undefined;
a ? b : c;
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
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
