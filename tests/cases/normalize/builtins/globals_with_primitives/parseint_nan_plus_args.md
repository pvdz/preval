# Preval test case

# parseint_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Parseint nan plus args
>
> Calling parseInt on a primitive should resolve

## Input

`````js filename=intro
$(parseInt(NaN, 1, "two", implicitGlobal, 3));
`````

## Settled


`````js filename=intro
implicitGlobal;
$(NaN);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
implicitGlobal;
$(NaN);
`````

## Pre Normal


`````js filename=intro
$(parseInt(NaN, 1, `two`, implicitGlobal, 3));
`````

## Normalized


`````js filename=intro
const tmpArgOverflowOne = NaN;
const tmpArgOverflowTwo = 1;
implicitGlobal;
const tmpCalleeParam = parseInt(tmpArgOverflowOne, tmpArgOverflowTwo);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
implicitGlobal;
$( NaN );
`````

## Globals

BAD@! Found 1 implicit global bindings:

implicitGlobal

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
