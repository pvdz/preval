# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: [{}],
  },
} = { x: { x: 13, y: [{ a: 1, b: 2, c: 3 }, 15], z: 14 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var arrPatternSplat;
var arrPatternStep;
tmpElement = { a: 1, b: 2, c: 3 };
tmpObjPropValue_1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault_1];
arrPatternStep = arrPatternSplat[0];
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
var x;
x = { x: 8, x: 8, x: 8 };
x = [x, 8];
x = { x: 8, x: x, x: 8 };
x = { x: x, x: 8, x: 8 };
x = x.x;
x = x.x;
x = [...x];
x = x[8];
x('str');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var arrPatternSplat;
var arrPatternStep;
tmpElement = { a: 1, b: 2, c: 3 };
tmpObjPropValue_1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault_1];
arrPatternStep = arrPatternSplat[0];
$('ok');
`````
