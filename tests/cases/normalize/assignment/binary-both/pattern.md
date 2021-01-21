# Preval test case

# pattern.md

> normalize > assignment > binary-both > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$(([x, y] = z) + ([x, y] = z));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinaryLeft = arrAssignPatternRhs;
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[0];
y = arrPatternSplat_1[1];
tmpBinaryRight = arrAssignPatternRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinaryLeft = arrAssignPatternRhs;
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[0];
y = arrPatternSplat_1[1];
tmpBinaryRight = arrAssignPatternRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: "10,20,3010,20,30"
 - 1: 10,20,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
