# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: { y },
  },
] = [{ x: { x: 1, y: 2, z: 3 }, y: 11 }, 10]);
$(y);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var y;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
y = objPatternNoDefault.y;
$(y);
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
x = { x: x, x: 8 };
x = [x, 8];
x = [...x];
x = x[8];
x = x.x;
x = x.x;
x(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var y;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
y = objPatternNoDefault.y;
$(y);
`````
