# Preval test case

# parsefloat_infinity.md

> Normalize > Builtins > Globals with primitives > Parsefloat infinity
>
> Calling parseFloat on a primitive should resolve

## Input

`````js filename=intro
$(parseFloat(Infinity));
`````

## Settled


`````js filename=intro
$(Infinity);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Infinity);
`````

## Pre Normal


`````js filename=intro
$(parseFloat(Infinity));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = Infinity;
$(Infinity);
`````

## PST Settled
With rename=true

`````js filename=intro
$( Infinity );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
