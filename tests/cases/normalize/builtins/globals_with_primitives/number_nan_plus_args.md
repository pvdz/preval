# Preval test case

# number_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Number nan plus args
>
> Calling Number on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(Number(NaN, 1, "two", implicitGlobal, 3));
`````

## Pre Normal

`````js filename=intro
$(Number(NaN, 1, `two`, implicitGlobal, 3));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpStringFirstArg = NaN;
implicitGlobal;
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
implicitGlobal;
$(NaN);
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
