# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [{ ...y }] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var tmpObjPropValue;
var tmpElement;
tmpElement = { x: 1, y: 2, c: 3 };
tmpObjPropValue = [tmpElement, 13, 14];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
y = objPatternRest(arrPatternStep, []);
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var tmpObjPropValue;
var tmpElement;
tmpElement = { x: 1, y: 2, c: 3 };
tmpObjPropValue = [tmpElement, 13, 14];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
y = objPatternRest(arrPatternStep, []);
$(y);
`````

## Result

Should call `$` with:
[[{ x: 1, y: 2, c: 3 }], null];

Normalized calls: Same

Final output calls: Same
