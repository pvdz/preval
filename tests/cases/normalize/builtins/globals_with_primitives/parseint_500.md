# Preval test case

# parseint_500.md

> Normalize > Builtins > Globals with primitives > Parseint 500
>
> Calling parseInt on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(parseInt(500));
`````

## Pre Normal

`````js filename=intro
$(parseInt(500));
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
