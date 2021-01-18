# Preval test case

# simple_pattern.md

> normalize > assignment > obj-prop-init > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
$({foo: a = [x, y] = z});
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs_1;
var tmpArg;
var tmpObjPropValue;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs_1 = arrPatternSplat[1];
y = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpObjPropValue = tmpNestedComplexRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs_1;
var tmpArg;
var tmpObjPropValue;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs_1 = arrPatternSplat[1];
y = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpObjPropValue = tmpNestedComplexRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, x, y, z);
`````

## Result

Should call `$` with:
[[{ foo: [10, 20, 30] }], [[10, 20, 30], 10, 20, [10, 20, 30]], null];

Normalized calls: BAD?!
[[{ foo: 20 }], [20, 10, 20, [10, 20, 30]], null];

Final output calls: BAD!!
[[{ foo: 20 }], [20, 10, 20, [10, 20, 30]], null];

