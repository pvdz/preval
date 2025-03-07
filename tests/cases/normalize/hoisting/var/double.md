# Preval test case

# double.md

> Normalize > Hoisting > Var > Double
>
> Duplicate var statements is legit but we should drop the duplicate version

## Input

`````js filename=intro
var x = 1;
var x = 2;
$(x);
`````

## Settled


`````js filename=intro
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = 1;
x = 2;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 1;
x = 2;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
