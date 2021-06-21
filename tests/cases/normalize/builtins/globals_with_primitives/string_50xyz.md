# Preval test case

# string_50xyz.md

> Normalize > Builtins > Globals with primitives > String 50xyz
>
> Calling String on a primitive should resolve

This is different from `parseInt`...

#TODO

## Input

`````js filename=intro
$(String("50xyz"));
`````

## Pre Normal

`````js filename=intro
$(String(`50xyz`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = String(`50xyz`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = String(`50xyz`);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '50xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
