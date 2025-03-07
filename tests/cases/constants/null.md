# Preval test case

# null.md

> Constants > Null
>
> A constant set to null should be eliminated

## Input

`````js filename=intro
const x = null;
$(x);
`````

## Settled


`````js filename=intro
$(null);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(null);
`````

## Pre Normal


`````js filename=intro
const x = null;
$(x);
`````

## Normalized


`````js filename=intro
const x = null;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( null );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
