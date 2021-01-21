# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > binary-right > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$(500 + ([x, y] = ($(x), $(y), $(z))));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = $(z);
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinaryRight = arrAssignPatternRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = $(z);
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinaryRight = arrAssignPatternRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: [10,20,30]
 - 3: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
