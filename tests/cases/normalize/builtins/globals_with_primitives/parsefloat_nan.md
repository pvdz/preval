# Preval test case

# parsefloat_nan.md

> Normalize > Builtins > Globals with primitives > Parsefloat nan
>
> Calling parseFloat on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(parseFloat(NaN));
`````

## Pre Normal

`````js filename=intro
$(parseFloat(NaN));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = parseFloat(NaN);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = parseFloat(NaN);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same