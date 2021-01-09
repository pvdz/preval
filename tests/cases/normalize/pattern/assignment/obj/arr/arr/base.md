# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [[]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
tmpElement = [1, 2, 3];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
var x;
x = [8, 8, 8];
x = [x, 8];
x = { x: x, x: 8, x: 8 };
x = x.x;
x = [...x];
x = x[8];
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
tmpElement = [1, 2, 3];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````
