# Preval test case

# auto_computed_simple_complex_simple.md

> normalize > expressions > assignments > export_default > auto_computed_simple_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = { b: $(1) };
a[$("b")] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export { tmpExportDefault as default };
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $('b');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export { tmpExportDefault as default };
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $('b');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
