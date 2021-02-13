# Preval test case

# auto_ident_unary_plus_simple.md

> normalize > expressions > assignments > export_default > auto_ident_unary_plus_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default a = +arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = +arg;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = +arg;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, arg);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
