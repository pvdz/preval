# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: [{}],
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpElement_1;
tmpElement_1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement_1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
const arrPatternStep_1 = arrPatternSplat_1[0];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpElement_1;
tmpElement_1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement_1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
arrPatternSplat_1[0];
$('ok');
`````
