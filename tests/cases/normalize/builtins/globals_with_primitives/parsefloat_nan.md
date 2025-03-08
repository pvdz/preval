# Preval test case

# parsefloat_nan.md

> Normalize > Builtins > Globals with primitives > Parsefloat nan
>
> Calling parseFloat on a primitive should resolve

## Input

`````js filename=intro
$(parseFloat(NaN));
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
$(parseFloat(NaN));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = NaN;
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
