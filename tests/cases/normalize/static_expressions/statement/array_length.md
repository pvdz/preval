# Preval test case

# array_length.md

> Normalize > Static expressions > Statement > Array length
>
> The length property on an array literal can be determined at compile time

## Input

`````js filename=intro
$([10, 20, 30].length);
`````

## Settled


`````js filename=intro
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````

## Pre Normal


`````js filename=intro
$([10, 20, 30].length);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 3;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
