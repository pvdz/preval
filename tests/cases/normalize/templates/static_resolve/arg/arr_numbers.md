# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Arg > Arr numbers
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${[1,2,3]}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr = [1, 2, 3];
const tmpCalleeParam = `${tmpTemplateExpr}`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [1, 2, 3];
const tmpCalleeParam = `${tmpTemplateExpr}`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,2,3'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
