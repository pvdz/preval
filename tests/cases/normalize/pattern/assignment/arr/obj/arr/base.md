# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: [],
  },
] = [{ x: [1, 2, 3] }, 20, 30]);
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var arrPatternSplat_1;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat_1 = [...objPatternNoDefault];
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
x = { x: x };
x = [x, 8, 8];
x = [...x];
x = x[8];
x = x.x;
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var arrPatternSplat_1;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat_1 = [...objPatternNoDefault];
$('ok');
`````
