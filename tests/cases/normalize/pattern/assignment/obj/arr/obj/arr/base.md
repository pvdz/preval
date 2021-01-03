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
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault_1;
var arrPatternSplat_1;
objAssignPatternRhs = { x: ((tmpElement = { x: 15, y: [1, 2, 3], c: 16 }), [tmpElement, 13, 14]), a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault_1 = arrPatternStep.y;
arrPatternSplat_1 = [...objPatternNoDefault_1];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault_1;
var arrPatternSplat_1;
objAssignPatternRhs = { x: ((tmpElement = { x: 15, y: [1, 2, 3], c: 16 }), [tmpElement, 13, 14]), a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault_1 = arrPatternStep.y;
arrPatternSplat_1 = [...objPatternNoDefault_1];
$('ok');
`````
