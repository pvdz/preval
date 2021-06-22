# Preval test case

# isfinite_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Isfinite nan plus args
>
> Calling isFinite on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(isFinite(NaN, 1, "two", implicitGlobal, 3));
`````

## Pre Normal

`````js filename=intro
$(isFinite(NaN, 1, `two`, implicitGlobal, 3));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
implicitGlobal;
const tmpCalleeParam = false;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
implicitGlobal;
$(false);
`````

## Globals

BAD@! Found 1 implicit global bindings:

implicitGlobal

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same