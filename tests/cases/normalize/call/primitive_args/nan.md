# Preval test case

# nan.md

> Normalize > Call > Primitive args > Nan
>
> Primitive args that may need to be simplified

## Input

`````js filename=intro
$(NaN);
`````

## Settled


`````js filename=intro
$(NaN);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
`````

## Pre Normal


`````js filename=intro
$(NaN);
`````

## Normalized


`````js filename=intro
$(NaN);
`````

## PST Settled
With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
