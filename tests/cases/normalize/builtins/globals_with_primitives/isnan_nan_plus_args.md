# Preval test case

# isnan_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Isnan nan plus args
>
> Calling isNaN on a value that is a NaN should invariantly return true

#TODO

## Input

`````js filename=intro
$(isNaN(NaN, 1, "two", implicitGlobal, 3));
`````

## Pre Normal


`````js filename=intro
$(isNaN(NaN, 1, `two`, implicitGlobal, 3));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpArgOverflow = NaN;
implicitGlobal;
const tmpCalleeParam = isNaN(tmpArgOverflow);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
implicitGlobal;
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
implicitGlobal;
$( true );
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
