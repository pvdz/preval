# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [{}] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
objAssignPatternRhs = objAssignPatternRhs = { x: ((tmpElement = { x: 1, y: 2, c: 3 }), [tmpElement, 13, 14]), a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
objAssignPatternRhs = objAssignPatternRhs = { x: ((tmpElement = { x: 1, y: 2, c: 3 }), [tmpElement, 13, 14]), a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
$('ok');
`````
