# Preval test case

# pattern.md

> normalize > assignment > throw > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
throw [x, y] = z;
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
let tmpThrowArg = arrAssignPatternRhs;
throw tmpThrowArg;
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
let tmpThrowArg = arrAssignPatternRhs;
throw tmpThrowArg;
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: <crash[ 10,20,30 ]>

Normalized calls: Same

Final output calls: Same
