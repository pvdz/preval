# Preval test case

# pattern.md

> normalize > assignment > tagged > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$`abc ${[x, y] = z} def`
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = ['abc ', ' def'];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpArg$1 = arrAssignPatternRhs;
$(tmpArg, tmpArg$1);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = ['abc ', ' def'];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpArg$1 = arrAssignPatternRhs;
$(tmpArg, tmpArg$1);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: ["abc "," def"],[10,20,30]
 - 1: 10,20,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
