# Preval test case

# number_numbers.md

> Array > Number numbers
>
> Calling Number on arrays trigger spies

#TODO

## Input

`````js filename=intro
$(Number([1, 2, 3]));
`````

## Pre Normal

`````js filename=intro
$(Number([1, 2, 3]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCallCallee$1 = Number;
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
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