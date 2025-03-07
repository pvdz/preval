# Preval test case

# isnan_nan.md

> Normalize > Builtins > Globals with primitives > Isnan nan
>
> Calling isNaN on a value that is a NaN should invariantly return true

## Input

`````js filename=intro
$(parseInt(NaN));
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
$(parseInt(NaN));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = NaN;
$(tmpCalleeParam);
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
