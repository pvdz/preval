# Preval test case

# number_str_0.md

> Array > Static context > Number str 0
>
> Calling Number on arrays triggers coercion

## Input

`````js filename=intro
$(Number(['0']));
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
$(Number([`0`]));
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = [`0`];
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
