# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Arg > Arr holes
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${[1,,3]}`);
`````

## Pre Normal

`````js filename=intro
$(`${[1, , 3]}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr = [1, , 3];
const tmpCalleeParam = `${tmpTemplateExpr}`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [1, , 3];
const tmpCalleeParam = `${tmpTemplateExpr}`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
