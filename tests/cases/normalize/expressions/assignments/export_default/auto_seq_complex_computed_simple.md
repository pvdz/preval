# Preval test case

# auto_seq_complex_computed_simple.md

> Normalize > Expressions > Assignments > Export default > Auto seq complex computed simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = { b: $(1) };
($(1), $(a))["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(1);
const tmpAssignMemLhsObj = $(a);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(1);
const tmpAssignMemLhsObj = $(SSA_a);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
