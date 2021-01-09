# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: {},
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10]);
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpElement_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
tmpElement_1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement_1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
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
x = { x: 8, x: 8, x: 8 };
x = [x, 8];
x = { x: x, x: 8 };
x = [x, 8];
x = [...x];
x = x[8];
x = x.x;
x('str');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpElement_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
tmpElement_1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement_1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
$('ok');
`````
