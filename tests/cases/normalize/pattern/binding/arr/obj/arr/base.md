# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: [],
  },
] = [{ x: [1, 2, 3] }, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = [8, 8, 8];
x = { x: x };
var x = [x, 8, 8];
var x = [...x];
var x = x[8];
var x = x.x;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
[...objPatternNoDefault];
$('ok');
`````
