# Preval test case

# default_no_no__arr_arr_elided.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__arr_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x]] = [[, , , 1], 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
tmpElement = [, , , 1];
const bindingPatternArrRoot = [tmpElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1.slice(0);
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
tmpElement = [, , , 1];
const bindingPatternArrRoot = [tmpElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1.slice(0);
$(x);
`````
