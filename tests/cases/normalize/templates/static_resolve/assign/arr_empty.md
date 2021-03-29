# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Assign > Arr empty
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${[]}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `${[]}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpTemplateExpr = [];
x = `${tmpTemplateExpr}`;
$(x);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = [];
const tmpSSA_x = `${tmpTemplateExpr}`;
$(tmpSSA_x);
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
