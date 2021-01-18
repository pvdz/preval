# Preval test case

# pattern_pattern.md

> normalize > assignment > computed-prop > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
let obj = {};
obj[[a, b] = [, x, y] = z] = 1000;
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let obj = {};
tmpAssignedComputedObj = obj;
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[1];
tmpNestedComplexRhs = arrPatternSplat_1[2];
y = tmpNestedComplexRhs;
arrAssignPatternRhs = tmpNestedComplexRhs;
arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
tmpNestedComplexRhs_1 = arrPatternSplat[1];
b = tmpNestedComplexRhs_1;
tmpAssignedComputedProp = tmpNestedComplexRhs_1;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let obj = {};
tmpAssignedComputedObj = obj;
arrAssignPatternRhs_1 = z;
arrPatternSplat_1 = [...arrAssignPatternRhs_1];
x = arrPatternSplat_1[1];
tmpNestedComplexRhs = arrPatternSplat_1[2];
y = tmpNestedComplexRhs;
arrAssignPatternRhs = tmpNestedComplexRhs;
arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
tmpNestedComplexRhs_1 = arrPatternSplat[1];
b = tmpNestedComplexRhs_1;
tmpAssignedComputedProp = tmpNestedComplexRhs_1;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, x, y, z);
`````

## Result

Should call `$` with:
[[10, 20, 20, 30, [10, 20, 30]], null];

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

