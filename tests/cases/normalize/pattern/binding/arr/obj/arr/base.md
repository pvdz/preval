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
const bindingPatternArrRoot = ((tmpElement = { x: [1, 2, 3] }), [tmpElement, 20, 30]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  objPatternNoDefault = arrPatternStep.x,
  arrPatternSplat_1 = [...objPatternNoDefault];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = { x: [1, 2, 3] }), [tmpElement, 20, 30]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  objPatternNoDefault = arrPatternStep.x;
$('ok');
`````
