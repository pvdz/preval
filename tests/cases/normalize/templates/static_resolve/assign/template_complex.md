# Preval test case

# template_complex.md

> normalize > templates > static_resolve > assign > template_complex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${`a ${$(1)} b`}`;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpTemplateExpr$1 = $(1);
const tmpTemplateExpr = `a ${tmpTemplateExpr$1} b`;
x = `${tmpTemplateExpr}`;
$(x);
`````

## Output

`````js filename=intro
const tmpTemplateExpr$1 = $(1);
const tmpTemplateExpr = `a ${tmpTemplateExpr$1} b`;
const SSA_x = `${tmpTemplateExpr}`;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a 1 b'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
