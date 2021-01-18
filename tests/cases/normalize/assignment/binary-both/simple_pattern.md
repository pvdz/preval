# Preval test case

# simple_pattern.md

> normalize > assignment > binary-both > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
$((a = [x, y] = z) + (a = [x, y] = z));
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs_2;
var tmpNestedComplexRhs_3;
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpNestedComplexRhs_1;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs_2 = arrPatternSplat[1];
y = tmpNestedComplexRhs_2;
tmpNestedComplexRhs = tmpNestedComplexRhs_2;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[0];
tmpNestedComplexRhs_3 = arrPatternSplat_1[1];
y = tmpNestedComplexRhs_3;
tmpNestedComplexRhs_1 = tmpNestedComplexRhs_3;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs_2;
var tmpNestedComplexRhs_3;
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpNestedComplexRhs_1;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs_2 = arrPatternSplat[1];
y = tmpNestedComplexRhs_2;
tmpNestedComplexRhs = tmpNestedComplexRhs_2;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[0];
tmpNestedComplexRhs_3 = arrPatternSplat_1[1];
y = tmpNestedComplexRhs_3;
tmpNestedComplexRhs_1 = tmpNestedComplexRhs_3;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, x, y, z);
`````

## Result

Should call `$` with:
[['10,20,3010,20,30'], [[10, 20, 30], 10, 20, [10, 20, 30]], null];

Normalized calls: BAD?!
[[40], [20, 10, 20, [10, 20, 30]], null];

Final output calls: BAD!!
[[40], [20, 10, 20, [10, 20, 30]], null];

