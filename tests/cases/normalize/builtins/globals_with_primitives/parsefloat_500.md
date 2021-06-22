# Preval test case

# parsefloat_500.md

> Normalize > Builtins > Globals with primitives > Parsefloat 500
>
> Calling parseFloat on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(parseFloat(500));
`````

## Pre Normal

`````js filename=intro
$(parseFloat(500));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 500;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(500);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same