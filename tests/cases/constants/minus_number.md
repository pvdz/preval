# Preval test case

# minus_number.md

> Constants > Minus number
>
> Negative numbers should be treated as constants as well

## Input

`````js filename=intro
const x = -5;
const y = x;
$(y); // Should be inlined to -5
`````

## Settled


`````js filename=intro
$(-5);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-5);
`````

## Pre Normal


`````js filename=intro
const x = -5;
const y = x;
$(y);
`````

## Normalized


`````js filename=intro
const x = -5;
const y = x;
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -5 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
