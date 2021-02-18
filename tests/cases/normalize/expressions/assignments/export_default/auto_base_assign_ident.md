# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > assignments > export_default > auto_base_assign_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = b = $(2);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, b);
`````

## Output

`````js filename=intro
const tmpNestedComplexRhs = $(2);
const tmpExportDefault = tmpNestedComplexRhs;
export { tmpExportDefault as default };
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
