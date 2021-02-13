# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_unary_void_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = void $(100);
$(a);
`````

## Normalized

`````js filename=intro
$(100);
let a = undefined;
$(a);
`````

## Output

`````js filename=intro
$(100);
let a = undefined;
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same