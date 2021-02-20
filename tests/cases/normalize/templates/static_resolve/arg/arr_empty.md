# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Arg > Arr empty
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${[]}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr = [];
const tmpCalleeParam = `${tmpTemplateExpr}`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [];
const tmpCalleeParam = `${tmpTemplateExpr}`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
