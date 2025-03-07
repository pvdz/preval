# Preval test case

# undefined.md

> Normalize > Call > Primitive args > Undefined
>
> Primitive args that may need to be simplified

## Input

`````js filename=intro
$(undefined);
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
$(undefined);
`````

## Normalized


`````js filename=intro
$(undefined);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
