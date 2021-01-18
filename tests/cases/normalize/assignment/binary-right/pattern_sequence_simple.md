# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > binary-right > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$(500 + ($(500 + ([x, y] = ($(x), $(y), z)))));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var tmpBinaryRight;
var tmpArg_1;
var tmpBinaryRight_1;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
tmpBinaryRight_1 = tmpNestedComplexRhs;
tmpArg_1 = 500 + tmpBinaryRight_1;
tmpBinaryRight = $(tmpArg_1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var tmpBinaryRight;
var tmpArg_1;
var tmpBinaryRight_1;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
tmpBinaryRight_1 = tmpNestedComplexRhs;
tmpArg_1 = 500 + tmpBinaryRight_1;
tmpBinaryRight = $(tmpArg_1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
[[1], [2], ['50010,20,30'], [null], [10, 20, [10, 20, 30]], null];

Normalized calls: BAD?!
[[1], [2], [520], [null], [10, 20, [10, 20, 30]], null];

Final output calls: BAD!!
[[1], [2], [520], [null], [10, 20, [10, 20, 30]], null];

