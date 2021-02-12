# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > assignments > logic_and_both > auto_base_assign_pattern_arr
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

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpCallCallee$1 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1;
  const tmpCallCallee$2 = $;
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$2 = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  b = arrPatternSplat$1[0];
  tmpNestedComplexRhs$1 = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpCallCallee$1 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1;
  const tmpCallCallee$2 = $;
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$2 = [tmpArrElement$1];
  const tmpNestedAssignArrPatternRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  b = arrPatternSplat$1[0];
  tmpNestedComplexRhs$1 = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: [2]
 - 6: [2], 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
