# Preval test case

# pattern_pattern.md

> normalize > assignment > binary-both > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
$(([a, b] = [, x, y] = z) + ([a, b] = [, x, y] = z));
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedComplexRhs_2;
var tmpNestedComplexRhs_3;
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
var arrAssignPatternRhs_2;
var arrPatternSplat_2;
var arrAssignPatternRhs_3;
var arrPatternSplat_3;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[1];
tmpNestedComplexRhs = arrPatternSplat_1[2];
y = tmpNestedComplexRhs;
arrAssignPatternRhs = tmpNestedComplexRhs;
arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
tmpNestedComplexRhs_1 = arrPatternSplat[1];
b = tmpNestedComplexRhs_1;
tmpBinaryLeft = tmpNestedComplexRhs_1;
arrAssignPatternRhs_3 = z;
arrPatternSplat_3 = [...arrAssignPatternRhs_3];
x = arrPatternSplat_3[1];
tmpNestedComplexRhs_2 = arrPatternSplat_3[2];
y = tmpNestedComplexRhs_2;
arrAssignPatternRhs_2 = tmpNestedComplexRhs_2;
arrPatternSplat_2 = [...arrAssignPatternRhs_2];
a = arrPatternSplat_2[0];
tmpNestedComplexRhs_3 = arrPatternSplat_2[1];
b = tmpNestedComplexRhs_3;
tmpBinaryRight = tmpNestedComplexRhs_3;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedComplexRhs_2;
var tmpNestedComplexRhs_3;
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
var arrAssignPatternRhs_2;
var arrPatternSplat_2;
var arrAssignPatternRhs_3;
var arrPatternSplat_3;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[1];
tmpNestedComplexRhs = arrPatternSplat_1[2];
y = tmpNestedComplexRhs;
arrAssignPatternRhs = tmpNestedComplexRhs;
arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
tmpNestedComplexRhs_1 = arrPatternSplat[1];
b = tmpNestedComplexRhs_1;
tmpBinaryLeft = tmpNestedComplexRhs_1;
arrAssignPatternRhs_3 = z;
arrPatternSplat_3 = [...arrAssignPatternRhs_3];
x = arrPatternSplat_3[1];
tmpNestedComplexRhs_2 = arrPatternSplat_3[2];
y = tmpNestedComplexRhs_2;
arrAssignPatternRhs_2 = tmpNestedComplexRhs_2;
arrPatternSplat_2 = [...arrAssignPatternRhs_2];
a = arrPatternSplat_2[0];
tmpNestedComplexRhs_3 = arrPatternSplat_2[1];
b = tmpNestedComplexRhs_3;
tmpBinaryRight = tmpNestedComplexRhs_3;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, x, y, z);
`````

## Result

Should call `$` with:
[['10,20,3010,20,30'], [10, 20, 20, 30, [10, 20, 30]], null];

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

