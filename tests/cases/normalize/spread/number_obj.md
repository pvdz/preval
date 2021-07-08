# Preval test case

# number_obj.md

> Normalize > Spread > Number obj
>
> Spread on number is an error

#TODO

## Input

`````js filename=intro
const x = 100;
$({...x});
`````

## Pre Normal

`````js filename=intro
const x = 100;
$({ ...x });
`````

## Normalized

`````js filename=intro
const x = 100;
const tmpCallCallee = $;
const tmpCalleeParam = { ...x };
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = {};
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
