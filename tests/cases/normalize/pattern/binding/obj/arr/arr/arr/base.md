# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [[[]]] } = { x: [[[1, 2, 3], 14], 13], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
var tmpElement_1;
tmpElement_1 = [1, 2, 3];
tmpElement = [tmpElement_1, 14];
tmpObjPropValue = [tmpElement, 13];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
const arrPatternSplat_2 = [...arrPatternStep_1];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = [8, 8, 8];
x = [x, 8];
x = [x, 8];
var x = { x: x, x: 8, x: 8 };
var x = x.x;
var x = [...x];
var x = x[8];
var x = [...x];
var x = x[8];
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
var tmpElement_1;
tmpElement_1 = [1, 2, 3];
tmpElement = [tmpElement_1, 14];
tmpObjPropValue = [tmpElement, 13];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
[...arrPatternStep_1];
$('ok');
`````
