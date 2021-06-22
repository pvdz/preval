# Preval test case

# number_50xyz.md

> Normalize > Builtins > Globals with primitives > Number 50xyz
>
> Calling Number on a primitive should resolve

This is different from `parseInt`...

#TODO

## Input

`````js filename=intro
$(Number("50xyz"));
`````

## Pre Normal

`````js filename=intro
$(Number(`50xyz`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Number(`50xyz`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = Number(`50xyz`);
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