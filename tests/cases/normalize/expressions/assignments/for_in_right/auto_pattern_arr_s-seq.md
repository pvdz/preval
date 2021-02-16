# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > assignments > for_in_right > auto_pattern_arr_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (let x in ([a] = ($(10), $(20), [1, 2])));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpForInDeclRhs;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpForInDeclRhs = tmpNestedAssignArrPatternRhs;
let x;
for (x in tmpForInDeclRhs) {
}
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
let x;
for (x in tmpNestedAssignArrPatternRhs) {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
