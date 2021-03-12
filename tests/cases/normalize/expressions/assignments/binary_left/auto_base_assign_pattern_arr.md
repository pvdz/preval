# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Binary left > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) + $(100));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) + $(100));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const SSA_b = arrPatternSplat[0];
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpNestedAssignArrPatternRhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 100
 - 4: '2100'
 - 5: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
