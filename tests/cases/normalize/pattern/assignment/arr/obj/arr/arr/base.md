# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: [[]],
  },
] = [{ x: [[1, 2, 3], 10], y: 11 }, 20, 30]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternSplat$1;
var arrPatternSplat$2;
var arrPatternStep;
var arrPatternStep$1;
var objPatternNoDefault;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpElement$1 = [1, 2, 3];
tmpObjPropValue = [tmpElement$1, 10];
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat$1 = [...objPatternNoDefault];
arrPatternStep$1 = arrPatternSplat$1[0];
arrPatternSplat$2 = [...arrPatternStep$1];
arrAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternSplat$1;
var arrPatternSplat$2;
var arrPatternStep;
var arrPatternStep$1;
var objPatternNoDefault;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpElement$1 = [1, 2, 3];
tmpObjPropValue = [tmpElement$1, 10];
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat$1 = [...objPatternNoDefault];
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
