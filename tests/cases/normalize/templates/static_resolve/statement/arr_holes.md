# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Statement > Arr holes
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${[1,,3]}`;
`````

## Normalized

`````js filename=intro
const tmpTemplateExpr = [1, , 3];
`${tmpTemplateExpr}`;
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [1, , 3];
`${tmpTemplateExpr}`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same