# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: {
      y: {},
    },
  },
] = [{ x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 }, 10]);
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var objPatternNoDefault_1;
tmpElement = { x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var objPatternNoDefault_1;
tmpElement = { x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
$('ok');
`````
