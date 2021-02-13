# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > export_default > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
export default delete $(arg)["y"];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = 'y';
const tmpExportDefault = delete tmpDeleteCompObj[tmpDeleteCompProp];
export { tmpExportDefault as default };
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpExportDefault = delete tmpDeleteCompObj['y'];
export { tmpExportDefault as default };
$(a, arg);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same