# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > computed-prop > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let obj = {};
obj[[x, y] = ($(x), $(y), $(z))] = 1000;
$(x, y, z);
`````

## Normalized

`````js filename=intro
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
arrAssignPatternRhs = $(z);
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpAssignedComputedProp = arrAssignPatternRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(x, y, z);
`````

## Output

`````js filename=intro
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
arrAssignPatternRhs = $(z);
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpAssignedComputedProp = arrAssignPatternRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(x, y, z);
`````

## Result

Should call `$` with:
[[1], [2], [[10, 20, 30]], '<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
