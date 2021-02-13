# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > statement > tagged > auto_base_assign_pattern_arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$`before ${([b] = $([$(2)]))} after`;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$2 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$2);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpArrElement = $(2);
const tmpCalleeParam$2 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$2);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: ['before ', ' after'], [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same