# Preval test case

# parseint_infinity.md

> Normalize > Builtins > Globals with primitives > Parseint infinity
>
> Calling parseInt on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(parseInt(Infinity));
`````

## Pre Normal

`````js filename=intro
$(parseInt(Infinity));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = NaN;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(NaN);
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
