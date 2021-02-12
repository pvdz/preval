# Preval test case

# auto_ident_template_complex.md

> normalize > expressions > assignments > switch_case_block > auto_ident_template_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = `foo${$(1)}`;
$(a);
`````

## Normalized

`````js filename=intro
const tmpTemplateExpr = $(1);
let a = `foo${tmpTemplateExpr}`;
$(a);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = $(1);
let a = `foo${tmpTemplateExpr}`;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'foo1'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
