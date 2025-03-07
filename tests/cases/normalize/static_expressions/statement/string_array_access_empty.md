# Preval test case

# string_array_access_empty.md

> Normalize > Static expressions > Statement > String array access empty
>
> The length property on a string literal can be determined at compile time

## Input

`````js filename=intro
$(""[0]);
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
$(``[0]);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = undefined;
$(tmpCalleeParam);
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
