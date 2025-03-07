# Preval test case

# isfinite_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Isfinite nan plus args
>
> Calling isFinite on a primitive should resolve

## Input

`````js filename=intro
$(isFinite(NaN, 1, "two", implicitGlobal, 3));
`````

## Settled


`````js filename=intro
implicitGlobal;
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
implicitGlobal;
$(false);
`````

## Pre Normal


`````js filename=intro
$(isFinite(NaN, 1, `two`, implicitGlobal, 3));
`````

## Normalized


`````js filename=intro
const tmpArgOverflow = NaN;
implicitGlobal;
const tmpCalleeParam = isFinite(tmpArgOverflow);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
implicitGlobal;
$( false );
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
