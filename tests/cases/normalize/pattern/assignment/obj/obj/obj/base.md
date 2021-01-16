# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: {},
  },
} = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { z: 1, a: 2, b: 3 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { z: 1, a: 2, b: 3 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
$('ok');
`````
