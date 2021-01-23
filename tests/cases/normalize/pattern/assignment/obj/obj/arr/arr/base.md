# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: [[]],
  },
} = { x: { x: 13, y: [[1, 2, 3], 15], z: 14 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var arrPatternSplat;
var arrPatternSplat$1;
var arrPatternStep;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault$1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpElement = [1, 2, 3];
tmpObjPropValue$1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault$1];
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
var objPatternNoDefault$1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpElement = [1, 2, 3];
tmpObjPropValue$1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault$1];
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
