# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > assignments > export_default > auto_ident_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default a = ($(1), $(2), x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = x;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpExportDefault = 1;
export { tmpExportDefault as default };
$(1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
