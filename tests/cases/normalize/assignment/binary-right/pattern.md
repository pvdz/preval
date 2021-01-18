# Preval test case

# pattern.md

> normalize > assignment > binary-right > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$(500 + ([x, y] = z));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
[['50010,20,30'], [10, 20, [10, 20, 30]], null];

Normalized calls: BAD?!
[[520], [10, 20, [10, 20, 30]], null];

Final output calls: BAD!!
[[520], [10, 20, [10, 20, 30]], null];

