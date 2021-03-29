# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Assign > Arr numbers
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${[1,2,3]}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `${[1, 2, 3]}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpTemplateExpr = [1, 2, 3];
x = `${tmpTemplateExpr}`;
$(x);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [1, 2, 3];
const tmpSSA_x = `${tmpTemplateExpr}`;
$(tmpSSA_x);
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
