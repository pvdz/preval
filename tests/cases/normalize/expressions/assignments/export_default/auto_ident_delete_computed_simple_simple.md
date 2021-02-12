# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > export_default > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
export default a = delete x["y"];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete x['y'];
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete x['y'];
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, x);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
