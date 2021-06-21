# Preval test case

# string_nan.md

> Normalize > Builtins > Globals with primitives > String nan
>
> Calling String on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(String(NaN));
`````

## Pre Normal

`````js filename=intro
$(String(NaN));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = String(NaN);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = String(NaN);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
