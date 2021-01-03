# Preval test case

# default_no_no_no__obj_arr_0.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__obj_arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y] } = { x: [0], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var y;
objAssignPatternRhs = { x: [0], a: 11, b: 12 };
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
var y;
objAssignPatternRhs = { x: [0], a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
$(y);
`````