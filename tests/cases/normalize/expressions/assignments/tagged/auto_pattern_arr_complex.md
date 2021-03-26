# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$`before ${([a] = $([1, 2]))} after`;
$(a);
`````

## Pre Normal

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
const tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$3);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$3);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
const SSA_a = arrPatternSplat$1[0];
$(tmpCalleeParam, tmpNestedAssignArrPatternRhs);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
