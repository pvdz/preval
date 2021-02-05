# Preval test case

# auto_seq_simple_prop.md

> normalize > expressions > assignments > export_default > auto_seq_simple_prop
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = { b: $(1) };
($(1), a).b = $(2);
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
export default tmpExportDefault;
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
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
export default tmpExportDefault;
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
