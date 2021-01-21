# Preval test case

# pattern.md

> normalize > assignment > arr-spread > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$([...([x, y] = z)]);
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpElement = arrAssignPatternRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpElement = arrAssignPatternRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: [10,20,30]
 - 1: 10,20,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
