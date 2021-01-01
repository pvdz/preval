# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: [[]],
  },
] = [{ x: [[1, 2, 3], 10], y: 11 }, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement_1;
tmpElement = { x: ((tmpElement_1 = [1, 2, 3]), [tmpElement_1, 10]), y: 11 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
const arrPatternStep_1 = arrPatternSplat_1[0];
const arrPatternSplat_2 = [...arrPatternStep_1];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
tmpElement = { x: ((tmpElement_1 = [1, 2, 3]), [tmpElement_1, 10]), y: 11 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
const arrPatternStep_1 = arrPatternSplat_1[0];
$('ok');
`````
