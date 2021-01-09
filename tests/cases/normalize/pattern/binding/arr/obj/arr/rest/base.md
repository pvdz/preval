# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: [...y],
  },
] = [{ x: [1, 2, 3], y: 11 }, 20, 30];
$(y);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
const y = arrPatternSplat_1.slice(0);
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = [8, 8, 8];
x = { x: x, x: 8 };
var x = [x, 8, 8];
var x = [...x];
var x = x[8];
var x = x.x;
var x = [...x];
var x = x.x(8);
x(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
const y = arrPatternSplat_1.slice(0);
$(y);
`````
