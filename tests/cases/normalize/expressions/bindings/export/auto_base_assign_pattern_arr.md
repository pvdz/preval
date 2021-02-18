# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > bindings > export > auto_base_assign_pattern_arr
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

export let a = ([b] = $([$(2)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a;
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const SSA_b = arrPatternSplat[0];
const a = tmpNestedAssignArrPatternRhs;
export { a };
$(tmpNestedAssignArrPatternRhs, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
