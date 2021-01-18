# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > obj-prop-init > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$({foo: [x, y] = ($(x), $(y), z)});
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpObjPropValue = arrAssignPatternRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpObjPropValue = arrAssignPatternRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
[[1], [2], [{ foo: [10, 20, 30] }], [10, 20, [10, 20, 30]], null];

Normalized calls: Same

Final output calls: Same
