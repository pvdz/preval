# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [[[]]] } = { x: [[[1, 2, 3], 14], 13], a: 11, b: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var arrPatternSplat_2;
var tmpObjPropValue;
var tmpElement;
var tmpElement_1;
tmpElement_1 = [1, 2, 3];
tmpElement = [tmpElement_1, 14];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
arrPatternSplat_2 = [...arrPatternStep_1];
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var arrPatternSplat_2;
var tmpObjPropValue;
var tmpElement;
var tmpElement_1;
tmpElement_1 = [1, 2, 3];
tmpElement = [tmpElement_1, 14];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
arrPatternSplat_2 = [...arrPatternStep_1];
$('ok');
`````
