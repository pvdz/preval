# Preval test case

# string_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > String nan plus args
>
> Calling String on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(String(NaN, 1, "two", implicitGlobal, 3));
`````

## Pre Normal

`````js filename=intro
$(String(NaN, 1, `two`, implicitGlobal, 3));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = String(NaN, 1, `two`, implicitGlobal, 3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = String(NaN, 1, `two`, implicitGlobal, 3);
$(tmpCalleeParam);
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
