# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: {
      y: {},
    },
  },
] = [{ x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 }, 10];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
tmpElement = { x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
tmpElement = { x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
$('ok');
`````
