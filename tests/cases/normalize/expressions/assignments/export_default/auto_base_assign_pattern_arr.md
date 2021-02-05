# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > assignments > export_default > auto_base_assign_pattern_arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
export default a = [b] = $([$(2)]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpExportDefault;
let tmpNestedComplexRhs;
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpExportDefault;
let tmpNestedComplexRhs;
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
