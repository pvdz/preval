# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > assignments > logic_or_both > auto_pattern_arr_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = $([1, 2])) || ([a] = $([1, 2])));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCalleeParam = tmpNestedAssignArrPatternRhs;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$1];
  a = arrPatternSplat$2[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpCalleeParam;
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCalleeParam = tmpNestedAssignArrPatternRhs;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$2 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$2);
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$1];
  a = arrPatternSplat$2[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs$1;
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same