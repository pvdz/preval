# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Binary right > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$($(100) + (a = [b] = $([$(2)])));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$($(100) + (a = [b] = $([$(2)])));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpCallCallee$1 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const SSA_b = arrPatternSplat[0];
const tmpCalleeParam = tmpBinBothLhs + tmpNestedAssignArrPatternRhs;
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: '1002'
 - 5: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
