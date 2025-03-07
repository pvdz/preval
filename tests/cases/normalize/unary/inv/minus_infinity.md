# Preval test case

# minus_infinity.md

> Normalize > Unary > Inv > Minus infinity
>
> Inverting literals should be statically resolved

## Input

`````js filename=intro
$(!-Infinity);
`````

## Settled


`````js filename=intro
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````

## Pre Normal


`````js filename=intro
$(!-Infinity);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = false;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
