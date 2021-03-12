# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Var decl > Arr empty
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${[]}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `${[]}`;
$(x);
`````

## Normalized

`````js filename=intro
const tmpTemplateExpr = [];
let x = `${tmpTemplateExpr}`;
$(x);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [];
const x = `${tmpTemplateExpr}`;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
