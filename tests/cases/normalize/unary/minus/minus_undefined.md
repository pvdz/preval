# Preval test case

# minus_undefined.md

> Normalize > Unary > Minus > Minus undefined
>
> Negative literals should be statically resolved where possible

## Input

`````js filename=intro
$(-(-undefined));
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
$(-(-undefined));
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
