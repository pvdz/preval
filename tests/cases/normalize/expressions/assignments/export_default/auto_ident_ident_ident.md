# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > export_default > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
export default a = b = 2;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, b, c);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same