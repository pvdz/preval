# Preval test case

# auto_ident_unary_excl_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_unary_excl_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = !$(100);
$(a);
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $(100);
let a = !tmpUnaryArg;
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
let a = !tmpUnaryArg;
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
