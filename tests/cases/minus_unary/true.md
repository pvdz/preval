# Preval test case

# true.md

> Minus unary > True
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-true);
`````

## Settled


`````js filename=intro
$(-1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````

## Pre Normal


`````js filename=intro
$(-true);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -1;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
