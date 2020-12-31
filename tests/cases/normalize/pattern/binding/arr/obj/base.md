# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{}] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = { x: 1, y: 2, z: 3 }), [tmpElement, 20, 30]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = { x: 1, y: 2, z: 3 }), [tmpElement, 20, 30]),
  arrPatternSplat = [...bindingPatternArrRoot];
$('ok');
`````
