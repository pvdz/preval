# Preval test case

# call_stmt.md

> Normalize > Sequence > Call stmt
>
> Expression statement that is a call with callee that is a sequence

## Input

`````js filename=intro
($(), Date)();
`````

## Settled


`````js filename=intro
$();
Date();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
Date();
`````

## Pre Normal


`````js filename=intro
($(), Date)();
`````

## Normalized


`````js filename=intro
$();
const tmpCallComplexCallee = Date;
tmpCallComplexCallee();
`````

## PST Settled
With rename=true

`````js filename=intro
$();
Date();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
