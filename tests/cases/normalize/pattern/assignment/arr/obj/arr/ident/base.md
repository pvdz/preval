# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: [y],
  },
] = [{ x: [1, 2, 3] }, 20, 30]);
$(y);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var arrPatternSplat_1;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat_1 = [...objPatternNoDefault];
y = arrPatternSplat_1[0];
arrAssignPatternRhs;
$(y);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var arrPatternSplat_1;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat_1 = [...objPatternNoDefault];
y = arrPatternSplat_1[0];
$(y);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
