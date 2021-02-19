# Preval test case

# arr_numbers.md

> normalize > templates > static_resolve > var_decl > arr_numbers
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${[1,2,3]}`;
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

Normalized calls: Same

Final output calls: Same
