# Preval test case

# number_numbers.md

> Array > Static context > Number numbers
>
> Calling Number on arrays trigger spies

## Input

`````js filename=intro
$(Number([1, 2, 3]));
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
$(Number([1, 2, 3]));
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = [1, 2, 3];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
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
