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
var arrPatternSplat;
var arrPatternSplat$1;
var arrPatternSplat$2;
var arrPatternStep;
var arrPatternStep$1;
var objAssignPatternRhs;
var objPatternNoDefault;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpElement$1 = [1, 2, 3];
tmpElement = [tmpElement$1, 14];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
arrPatternStep$1 = arrPatternSplat$1[0];
arrPatternSplat$2 = [...arrPatternStep$1];
objAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrPatternSplat;
var arrPatternSplat$1;
var arrPatternSplat$2;
var arrPatternStep;
var arrPatternStep$1;
var objAssignPatternRhs;
var objPatternNoDefault;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpElement$1 = [1, 2, 3];
tmpElement = [tmpElement$1, 14];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
arrPatternStep$1 = arrPatternSplat$1[0];
arrPatternSplat$2 = [...arrPatternStep$1];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
