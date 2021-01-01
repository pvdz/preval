# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: [[]],
  },
} = { x: { x: 13, y: [[1, 2, 3], 15], z: 14 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
objAssignPatternRhs = objAssignPatternRhs = { x: { x: 13, y: ((tmpElement = [1, 2, 3]), [tmpElement, 15]), z: 14 }, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault_1];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
objAssignPatternRhs = objAssignPatternRhs = { x: { x: 13, y: ((tmpElement = [1, 2, 3]), [tmpElement, 15]), z: 14 }, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault_1];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````
