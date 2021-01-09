# Preval test case

# default_no_no__obj_arr_undefined.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = { x: [undefined], a: 11, b: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
tmpObjPropValue = [undefined];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
x = [x];
x = { x: x, x: 8, x: 8 };
x = x.x;
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
tmpObjPropValue = [undefined];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
$('ok');
`````
