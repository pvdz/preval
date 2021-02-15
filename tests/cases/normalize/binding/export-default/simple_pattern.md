# Preval test case

# simple_pattern.md

> normalize > assignment > export-default > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
export let a = [x, y] = z;
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a;
const tmpNestedAssignArrPatternRhs = z;
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
export { a };
$(a, x, y, z);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
const arrPatternSplat = [...z];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
const a = z;
export { a };
$(a, x, y, z);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
