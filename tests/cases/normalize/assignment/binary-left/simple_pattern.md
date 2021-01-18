# Preval test case

# simple_pattern.md

> normalize > assignment > binary-left > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
$((a = [x, y] = z) + 500);
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpNestedComplexRhs = arrAssignPatternRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpNestedComplexRhs = arrAssignPatternRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, x, y, z);
`````

## Result

Should call `$` with:
[['10,20,30500'], [[10, 20, 30], 10, 20, [10, 20, 30]], null];

Normalized calls: Same

Final output calls: Same
