# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > assignments > let > auto_pattern_arr_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
let xyz = ([a] = ($(10), $(20), [1, 2]));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let xyz;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
xyz = tmpNestedAssignArrPatternRhs;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
const xyz = tmpNestedAssignArrPatternRhs;
$(xyz);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
