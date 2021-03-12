# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Statement > Arr empty
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${[]}`;
`````

## Pre Normal

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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
