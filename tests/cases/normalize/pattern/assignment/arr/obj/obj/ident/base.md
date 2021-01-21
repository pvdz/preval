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
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
y = objPatternNoDefault.y;
arrAssignPatternRhs;
$(y);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
y = objPatternNoDefault.y;
$(y);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: undefined

Normalized calls: Same

Final output calls: Same
