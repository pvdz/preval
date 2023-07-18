# Preval test case

# number_numbers.md

> Array > Static context > Number numbers
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
const tmpStringFirstArg = [1, 2, 3];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(NaN);
`````

## PST Output

With rename=true

`````js filename=intro
$( NaN );
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
