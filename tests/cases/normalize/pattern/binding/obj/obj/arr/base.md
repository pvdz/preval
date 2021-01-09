# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: [],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault_1];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = [8, 8, 8];
x = { x: 8, x: x, x: 8 };
var x = { x: x, x: 8, x: 8 };
var x = x.x;
var x = x.x;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
[...objPatternNoDefault_1];
$('ok');
`````
