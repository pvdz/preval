# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [[y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var tmpObjPropValue;
var tmpElement;
tmpElement = [1, 2, 3];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
y = arrPatternSplat_1[0];
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var tmpObjPropValue;
var tmpElement;
tmpElement = [1, 2, 3];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
y = arrPatternSplat_1[0];
$(y);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
