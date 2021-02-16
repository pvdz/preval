# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > assignments > tagged > auto_pattern_arr_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$`before ${([a] = $([1, 2]))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$2);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$2 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$2);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
$(tmpCalleeParam, tmpNestedAssignArrPatternRhs);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
