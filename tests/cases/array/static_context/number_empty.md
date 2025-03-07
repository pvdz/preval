# Preval test case

# number_empty.md

> Array > Static context > Number empty
>
> Calling Number on arrays trigger spies

## Input

`````js filename=intro
$(Number([]));
`````

## Settled


`````js filename=intro
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````

## Pre Normal


`````js filename=intro
$(Number([]));
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = [];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
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
