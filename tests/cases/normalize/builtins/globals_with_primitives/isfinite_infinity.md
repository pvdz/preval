# Preval test case

# isfinite_infinity.md

> Normalize > Builtins > Globals with primitives > Isfinite infinity
>
> Calling isFinite on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(isFinite(Infinity));
`````

## Pre Normal

`````js filename=intro
$(isFinite(Infinity));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = false;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
