# Preval test case

# parseint_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Parseint nan plus args
>
> Calling parseInt on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(parseInt(NaN, 1, "two", implicitGlobal, 3));
`````

## Pre Normal

`````js filename=intro
$(parseInt(NaN, 1, `two`, implicitGlobal, 3));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = parseInt(NaN, 1, `two`, implicitGlobal, 3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = parseInt(NaN, 1, `two`, implicitGlobal, 3);
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
