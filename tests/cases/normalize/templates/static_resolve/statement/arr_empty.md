# Preval test case

# arr_empty.md

> normalize > templates > static_resolve > statement > arr_empty
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${[]}`;
`````

## Normalized

`````js filename=intro
const tmpTemplateExpr = [];
`${tmpTemplateExpr}`;
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [];
`${tmpTemplateExpr}`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
