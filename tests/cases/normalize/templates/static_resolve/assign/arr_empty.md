# Preval test case

# arr_empty.md

> normalize > templates > static_resolve > assign > arr_empty
>
> Templates should be able to resolve literals

#TODO

## Input

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
const SSA_x = `${tmpTemplateExpr}`;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
