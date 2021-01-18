# Preval test case

# pattern.md

> normalize > assignment > obj-prop-dyn > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$({[([x, y] = z)]: 1000});
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var tmpComputedKey;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
tmpComputedKey = tmpNestedComplexRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var tmpComputedKey;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
tmpComputedKey = tmpNestedComplexRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
[[{ '10,20,30': 1000 }], [10, 20, [10, 20, 30]], null];

Normalized calls: BAD?!
[[{ 20: 1000 }], [10, 20, [10, 20, 30]], null];

Final output calls: BAD!!
[[{ 20: 1000 }], [10, 20, [10, 20, 30]], null];

