# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y] } = { x: [1, 2, 3], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(y);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
