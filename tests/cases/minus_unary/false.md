# Preval test case

# false.md

> Minus unary > False
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

Note: the -0 is observable. Object.is(0, !false) -> false

## Input

`````js filename=intro
$(-false)
`````

## Settled


`````js filename=intro
$(-0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0);
`````

## Pre Normal


`````js filename=intro
$(-false);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -0;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
