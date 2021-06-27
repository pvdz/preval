# Preval test case

# number_empty.md

> Array > Static context > Number empty
>
> Calling Number on arrays trigger spies

#TODO

## Input

`````js filename=intro
$(Number([]));
`````

## Pre Normal

`````js filename=intro
$(Number([]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCallCallee$1 = Number;
const tmpCalleeParam$1 = [];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
