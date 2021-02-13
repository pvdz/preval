# Preval test case

# auto_ident_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = $(b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = $(b);
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = $(b);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same