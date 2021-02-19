# Preval test case

# template_complex.md

> normalize > templates > static_resolve > statement > template_complex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${`a ${$(1)} b`}`;
`````

## Normalized

`````js filename=intro
const tmpTemplateExpr$1 = $(1);
const tmpTemplateExpr = `a ${tmpTemplateExpr$1} b`;
`${tmpTemplateExpr}`;
`````

## Output

`````js filename=intro
const tmpTemplateExpr$1 = $(1);
const tmpTemplateExpr = `a ${tmpTemplateExpr$1} b`;
`${tmpTemplateExpr}`;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
