# Preval test case

# true.md

> Normalize > Unary > Tilde > True
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~true);
`````

## Settled


`````js filename=intro
$(-2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-2);
`````

## Pre Normal


`````js filename=intro
$(~true);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -2;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
