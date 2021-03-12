# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Var decl > Arr numbers
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${[1,2,3]}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `${[1, 2, 3]}`;
$(x);
`````

## Normalized

`````js filename=intro
const tmpTemplateExpr = [1, 2, 3];
let x = `${tmpTemplateExpr}`;
$(x);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [1, 2, 3];
const x = `${tmpTemplateExpr}`;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
