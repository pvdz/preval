# Preval test case

# pattern_pattern.md

> Normalize > Binding > For-a > Pattern pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
for (let [a, b] = [, x, y] = z;false;) $(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
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
let a$1 = arrPatternSplat[0];
let b$1 = arrPatternSplat[1];
`````

## Output

`````js filename=intro
const z = [10, 20, 30];
const arrPatternSplat$1 = [...z];
arrPatternSplat$1[1];
arrPatternSplat$1[2];
const arrPatternSplat = [...z];
arrPatternSplat[0];
arrPatternSplat[1];
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
