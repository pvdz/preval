# Preval test case

# early_access.md

> Normalize > Var > Early access
>
> Actual early access case

## Input

`````js filename=intro
$(x); // We shouldn't break this being undefined
var x = 10; 
$(x);
`````

## Settled


`````js filename=intro
$(undefined);
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(10);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(x);
x = 10;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
$(undefined);
x = 10;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
