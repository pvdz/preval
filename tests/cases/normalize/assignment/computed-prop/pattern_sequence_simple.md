# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > computed-prop > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let obj = {};
obj[[x, y] = ($(x), $(y), z)] = 1000;
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let obj = {};
tmpAssignComMemLhsObj = obj;
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpAssignComMemLhsProp = arrAssignPatternRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let obj = {};
tmpAssignComMemLhsObj = obj;
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpAssignComMemLhsProp = arrAssignPatternRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 10,20,[10,20,30]
 - 3: undefined

Normalized calls: Same

Final output calls: Same
