# Preval test case

# default_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = { x: undefined, a: 11, b: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
objAssignPatternRhs = { x: undefined, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = { x: x, x: 8, x: 8 };
x = x.x;
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
objAssignPatternRhs = { x: undefined, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````
