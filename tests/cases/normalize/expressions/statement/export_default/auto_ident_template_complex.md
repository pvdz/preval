# Preval test case

# auto_ident_template_complex.md

> normalize > expressions > statement > export_default > auto_ident_template_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'foo1'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
