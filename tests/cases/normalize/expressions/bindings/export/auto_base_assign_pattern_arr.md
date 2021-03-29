# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Bindings > Export > Auto base assign pattern arr
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

export let a = ([b] = $([$(2)]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = ([b] = $([$(2)]));
export { a };
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
const tmpSSA_b = arrPatternSplat[0];
const tmpSSA_a = tmpNestedAssignArrPatternRhs;
export { tmpSSA_a as a };
$(tmpNestedAssignArrPatternRhs, tmpSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
