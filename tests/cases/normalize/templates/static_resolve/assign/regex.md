# Preval test case

# regex.md

> normalize > templates > static_resolve > assign > regex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${/foo/g}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpTemplateExpr = /foo/g;
x = `${tmpTemplateExpr}`;
$(x);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = /foo/g;
const SSA_x = `${tmpTemplateExpr}`;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/foo/g'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
