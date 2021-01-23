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
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpArg;
var tmpArg$1;
var tmpBinaryRight;
var tmpBinaryRight$1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinaryRight$1 = arrAssignPatternRhs;
tmpArg$1 = 500 + tmpBinaryRight$1;
tmpBinaryRight = $(tmpArg$1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpArg;
var tmpArg$1;
var tmpBinaryRight;
var tmpBinaryRight$1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinaryRight$1 = arrAssignPatternRhs;
tmpArg$1 = 500 + tmpBinaryRight$1;
tmpBinaryRight = $(tmpArg$1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: "50010,20,30"
 - 3: "50050010,20,30"
 - 4: 10,20,[10,20,30]
 - 5: undefined

Normalized calls: Same

Final output calls: Same
