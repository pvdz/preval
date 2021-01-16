# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: [...z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 });
$(z);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var arrPatternSplat;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault_1];
z = arrPatternSplat.slice(0);
$(z);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var arrPatternSplat;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
arrPatternSplat = [...objPatternNoDefault_1];
z = arrPatternSplat.slice(0);
$(z);
`````
