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
const tmpStringFirstArg = `50xyz`;
const tmpCalleeParam = $coerce(tmpStringFirstArg, `string`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`50xyz`);
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
