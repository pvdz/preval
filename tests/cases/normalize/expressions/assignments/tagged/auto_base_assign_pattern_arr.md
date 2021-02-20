# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Tagged > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$`before ${(a = [b] = $([$(2)]))} after`;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$2 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$2);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
const tmpArrElement = $(2);
const tmpCalleeParam$2 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$2);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const SSA_b = arrPatternSplat[0];
$(tmpCalleeParam, tmpNestedAssignArrPatternRhs);
$(tmpNestedAssignArrPatternRhs, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: ['before ', ' after'], [2]
 - 4: [2], 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
