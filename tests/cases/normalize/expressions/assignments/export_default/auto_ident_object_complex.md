# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > assignments > export_default > auto_ident_object_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
const tmpNestedComplexRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const tmpNestedComplexRhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
