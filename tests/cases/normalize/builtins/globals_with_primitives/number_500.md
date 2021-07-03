# Preval test case

# number_500.md

> Normalize > Builtins > Globals with primitives > Number 500
>
> Calling Number on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(Number(500));
`````

## Pre Normal

`````js filename=intro
$(Number(500));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpStringFirstArg = 500;
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
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
