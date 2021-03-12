# Preval test case

# auto_ident_template_complex.md

> Normalize > Expressions > Statement > Logic and left > Auto ident template complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = `foo${$(1)}`;
$(a);
`````

## Pre Normal

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
const a = `foo${tmpTemplateExpr}`;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'foo1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
