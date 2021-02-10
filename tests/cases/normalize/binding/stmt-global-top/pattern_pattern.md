# Preval test case

# pattern_pattern.md

> normalize > assignment > stmt > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let [a, b] = [, x, y] = z;
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let bindingPatternArrRoot;
const tmpNestedAssignArrPatternRhs = z;
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat$1[1];
y = arrPatternSplat$1[2];
bindingPatternArrRoot = tmpNestedAssignArrPatternRhs;
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let b = arrPatternSplat[1];
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 10, 20, 20, 30, [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
