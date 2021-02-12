# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_unary_typeof_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = typeof $(x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpUnaryArg = $(x);
let a = typeof tmpUnaryArg;
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
const tmpUnaryArg = $(x);
let a = typeof tmpUnaryArg;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
