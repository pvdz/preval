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
var tmpNestedComplexRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let obj = {};
tmpAssignedComputedObj = obj;
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
tmpAssignedComputedProp = tmpNestedComplexRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let obj = {};
tmpAssignedComputedObj = obj;
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
tmpAssignedComputedProp = tmpNestedComplexRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(x, y, z);
`````

## Result

Should call `$` with:
[[1], [2], [10, 20, [10, 20, 30]], null];

Normalized calls: Same

Final output calls: Same
