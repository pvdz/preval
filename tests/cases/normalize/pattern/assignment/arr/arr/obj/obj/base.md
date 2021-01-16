# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  [
    {
      x: {},
    },
  ],
] = [[{ x: { a: 1, b: 2, c: 3 } }, 20, 30], 40, 50]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var objPatternNoDefault;
var tmpElement;
var tmpElement_1;
var tmpObjPropValue;
tmpObjPropValue = { a: 1, b: 2, c: 3 };
tmpElement_1 = { x: tmpObjPropValue };
tmpElement = [tmpElement_1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
objPatternNoDefault = arrPatternStep_1.x;
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var objPatternNoDefault;
var tmpElement;
var tmpElement_1;
var tmpObjPropValue;
tmpObjPropValue = { a: 1, b: 2, c: 3 };
tmpElement_1 = { x: tmpObjPropValue };
tmpElement = [tmpElement_1, 20, 30];
arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
objPatternNoDefault = arrPatternStep_1.x;
$('ok');
`````
