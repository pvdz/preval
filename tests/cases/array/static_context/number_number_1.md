# Preval test case

# number_number_1.md

> Array > Static context > Number number 1
>
> Calling Number on arrays trigger spies

#TODO

## Input

`````js filename=intro
$(Number([1]));
`````

## Pre Normal

`````js filename=intro
$(Number([1]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpStringFirstArg = [1];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
