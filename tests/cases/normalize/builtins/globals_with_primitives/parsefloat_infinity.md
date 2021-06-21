# Preval test case

# parsefloat_infinity.md

> Normalize > Builtins > Globals with primitives > Parsefloat infinity
>
> Calling parseFloat on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(parseFloat(Infinity));
`````

## Pre Normal

`````js filename=intro
$(parseFloat(Infinity));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Infinity;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(Infinity);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
