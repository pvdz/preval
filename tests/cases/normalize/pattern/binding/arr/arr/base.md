# Preval test case

# base.md

> normalize > pattern > param > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[]] = [[1, 2, 3], 4, 5];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = [1, 2, 3]), [tmpElement, 4, 5]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = [1, 2, 3]), [tmpElement, 4, 5]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0];
$('ok');
`````
