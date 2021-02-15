# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > statement > arr_spread > auto_base_assign_pattern_arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
[...([b] = $([$(2)]))];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpArrElToSpread;
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpArrElToSpread = tmpNestedAssignArrPatternRhs;
[...tmpArrElToSpread];
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
const tmpArrElToSpread = tmpNestedAssignArrPatternRhs;
[...tmpArrElToSpread];
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
