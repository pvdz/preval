# Preval test case

# null.md

> Normalize > Call > Primitive args > Null
>
> Primitive args that may need to be simplified

## Input

`````js filename=intro
$(null);
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
$(null);
`````

## Normalized


`````js filename=intro
$(null);
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
