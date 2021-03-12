# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
let obj = {};
(a = [b] = $([$(2)])).a;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let obj = {};
(a = [b] = $([$(2)])).a;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const SSA_b = arrPatternSplat[0];
tmpNestedAssignArrPatternRhs.a;
$(tmpNestedAssignArrPatternRhs, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
