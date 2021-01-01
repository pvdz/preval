# Preval test case

# default_no_no__obj_123.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] } = { x: 1, a: 2, b: 3 });
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
objAssignPatternRhs = objAssignPatternRhs = { x: 1, a: 2, b: 3 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
objAssignPatternRhs = objAssignPatternRhs = { x: 1, a: 2, b: 3 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````
