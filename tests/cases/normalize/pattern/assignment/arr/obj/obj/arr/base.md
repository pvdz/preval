# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: {
      y: [],
    },
  },
] = [{ x: { x: 13, y: [1, 2, 3], z: 31 }, y: 11 }, 10]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var objPatternNoDefault$1;
var arrPatternSplat$1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
arrPatternSplat$1 = [...objPatternNoDefault$1];
arrAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var objPatternNoDefault$1;
var arrPatternSplat$1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
arrPatternSplat$1 = [...objPatternNoDefault$1];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
