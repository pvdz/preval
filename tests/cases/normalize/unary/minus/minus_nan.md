# Preval test case

# minus_nan.md

> Normalize > Unary > Minus > Minus nan
>
> Negative literals should be statically resolved where possible

## Input

`````js filename=intro
$(-(-NaN));
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
$(-(-NaN));
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
