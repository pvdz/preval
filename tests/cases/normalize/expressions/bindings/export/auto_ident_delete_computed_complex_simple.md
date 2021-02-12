# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > bindings > export > auto_ident_delete_computed_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

export let a = delete $(x)["y"];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
export { a };
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
export { a };
$(a, x);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
