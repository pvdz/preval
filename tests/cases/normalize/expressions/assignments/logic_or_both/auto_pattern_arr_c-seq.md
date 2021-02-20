# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), $([1, 2]))) || ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
let tmpCalleeParam;
$(10);
$(20);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCalleeParam = tmpNestedAssignArrPatternRhs;
if (tmpCalleeParam) {
} else {
  $(10);
  $(20);
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
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
let SSA_a = arrPatternSplat$1[0];
let SSA_tmpCalleeParam = tmpNestedAssignArrPatternRhs;
if (SSA_tmpCalleeParam) {
} else {
  $(10);
  $(20);
  const tmpCalleeParam$2 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$2);
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$1];
  SSA_a = arrPatternSplat$2[0];
  SSA_tmpCalleeParam = tmpNestedAssignArrPatternRhs$1;
}
$(SSA_tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
