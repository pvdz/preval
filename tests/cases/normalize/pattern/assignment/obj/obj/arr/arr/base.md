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
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpElement;
tmpElement = [1, 2, 3];
tmpObjPropValue_1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault_1];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
objAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpElement;
tmpElement = [1, 2, 3];
tmpObjPropValue_1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault_1];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
