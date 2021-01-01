# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: {
      z: [],
    },
  },
} = { x: { x: 13, y: { z: [1, 2, 3], a: 15, b: 16 }, z: 14 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var objPatternNoDefault_2;
var arrPatternSplat;
objAssignPatternRhs = objAssignPatternRhs = { x: { x: 13, y: { z: [1, 2, 3], a: 15, b: 16 }, z: 14 }, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
objPatternNoDefault_2 = objPatternNoDefault_1.z;
arrPatternSplat = [...objPatternNoDefault_2];
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var objPatternNoDefault_2;
var arrPatternSplat;
objAssignPatternRhs = objAssignPatternRhs = { x: { x: 13, y: { z: [1, 2, 3], a: 15, b: 16 }, z: 14 }, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
objPatternNoDefault_2 = objPatternNoDefault_1.z;
arrPatternSplat = [...objPatternNoDefault_2];
$('ok');
`````
