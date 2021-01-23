# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: [
    {
      y: [],
    },
  ],
} = { x: [{ x: 15, y: [1, 2, 3], c: 16 }, 13, 14], a: 11, b: 12 });
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
tmpObjPropValue$1 = [1, 2, 3];
tmpElement = { x: 15, y: tmpObjPropValue$1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault$1 = arrPatternStep.y;
arrPatternSplat$1 = [...objPatternNoDefault$1];
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
tmpObjPropValue$1 = [1, 2, 3];
tmpElement = { x: 15, y: tmpObjPropValue$1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault$1 = arrPatternStep.y;
arrPatternSplat$1 = [...objPatternNoDefault$1];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
