# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > bindings > export > auto_ident_delete_computed_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete $(arg)["y"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = 'y';
let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
export { a };
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
let a = delete tmpDeleteCompObj['y'];
export { a };
$(a, arg);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same