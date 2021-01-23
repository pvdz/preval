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
var arrPatternSplat;
var arrPatternSplat$1;
var arrPatternStep;
var objAssignPatternRhs;
var objPatternNoDefault;
var tmpElement;
var tmpObjPropValue;
tmpElement = [1, 2, 3];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
objAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrPatternSplat;
var arrPatternSplat$1;
var arrPatternStep;
var objAssignPatternRhs;
var objPatternNoDefault;
var tmpElement;
var tmpObjPropValue;
tmpElement = [1, 2, 3];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat$1 = [...arrPatternStep];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
