# Preval test case

# negative_zero.md

> Normalize > Builtins > Math > Pow > Negative zero
>
> Static expressions can be inlined under certain conditions

This ought to return -0.

## Input

`````js filename=intro
$(Math.pow(-0, 1));
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
$(Math.pow(-0, 1));
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
