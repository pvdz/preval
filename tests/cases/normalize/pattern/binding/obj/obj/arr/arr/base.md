# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: [[]],
  },
} = { x: { x: 13, y: [[1, 2, 3], 15], z: 14 }, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpElement;
tmpElement = [1, 2, 3];
tmpObjPropValue_1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault_1];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = [8, 8, 8];
x = [x, 8];
x = { x: 8, x: x, x: 8 };
var x = { x: x, x: 8, x: 8 };
var x = x.x;
var x = x.x;
var x = [...x];
var x = x[8];
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpElement;
tmpElement = [1, 2, 3];
tmpObjPropValue_1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault_1];
const arrPatternStep = arrPatternSplat[0];
[...arrPatternStep];
$('ok');
`````
