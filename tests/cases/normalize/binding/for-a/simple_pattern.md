# Preval test case

# simple_pattern.md

> normalize > assignment > for-a > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
for (let a = [x, y] = z;false;) $(a, x, y, z);
`````

## Normalized

`````js filename=intro
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a_1;
const tmpNestedAssignArrPatternRhs = z;
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a_1 = tmpNestedAssignArrPatternRhs;
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a_1;
const arrPatternSplat = [...z];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a_1 = z;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
