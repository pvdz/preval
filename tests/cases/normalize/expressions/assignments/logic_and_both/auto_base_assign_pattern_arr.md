# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Logic and both > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) && (a = [b] = $([$(2)])));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) && (a = [b] = $([$(2)])));
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpCallCallee$3 = $;
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$3 = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  b = arrPatternSplat$1[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_b = arrPatternSplat[0];
let tmpClusterSSA_a = tmpNestedAssignArrPatternRhs;
const tmpCalleeParam = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$3 = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  tmpClusterSSA_b = arrPatternSplat$1[0];
  tmpClusterSSA_a = tmpNestedAssignArrPatternRhs$1;
  $(tmpNestedAssignArrPatternRhs$1);
} else {
  $(tmpCalleeParam);
}
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: [2]
 - 6: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
