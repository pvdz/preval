# Preval test case

# minus_false.md

> Normalize > Unary > Tilde > Minus false
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~(-false));
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
$(~-false);
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
