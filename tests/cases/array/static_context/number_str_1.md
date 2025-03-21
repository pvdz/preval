# Preval test case

# number_str_1.md

> Array > Static context > Number str 1
>
> Calling Number on arrays triggers coercion

## Input

`````js filename=intro
$(Number(['1']));
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
$(Number([`1`]));
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = [`1`];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
