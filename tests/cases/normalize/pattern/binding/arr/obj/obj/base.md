# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: {},
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement_1;
const bindingPatternArrRoot = ((tmpElement = { x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), [tmpElement_1, 12]), y: 11 }), [tmpElement, 10]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  objPatternNoDefault = arrPatternStep.x;
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
const bindingPatternArrRoot = ((tmpElement = { x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), [tmpElement_1, 12]), y: 11 }), [tmpElement, 10]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0];
$('ok');
`````
