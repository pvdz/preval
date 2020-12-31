# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[{ ...x }]] = [[{ x: 1, y: 2, z: 3 }, 20, 30], 40, 50];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement_1;
var tmpElement_2;
tmpElement_1 = { x: 1, y: 2, z: 3 };
tmpElement = [tmpElement_1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
const x = objPatternRest(arrPatternStep_1, []);
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
tmpElement_1 = { x: 1, y: 2, z: 3 };
tmpElement = [tmpElement_1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
const x = objPatternRest(arrPatternStep_1, []);
$(x);
`````
