# Preval test case

# pattern_pattern.md

> normalize > assignment > binary-left > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
$(([a, b] = [, x, y] = z) + 500);
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[1];
y = arrPatternSplat_1[2];
arrAssignPatternRhs = arrAssignPatternRhs_1;
arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
b = arrPatternSplat[1];
tmpBinaryLeft = arrAssignPatternRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[1];
y = arrPatternSplat_1[2];
arrAssignPatternRhs = arrAssignPatternRhs_1;
arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
b = arrPatternSplat[1];
tmpBinaryLeft = arrAssignPatternRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, x, y, z);
`````

## Result

Should call `$` with:
 - 0: "10,20,30500"
 - 1: 10,20,20,30,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
