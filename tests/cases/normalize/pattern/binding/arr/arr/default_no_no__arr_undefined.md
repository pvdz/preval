# Preval test case

# default_no_no__arr_undefined.md

> normalize > pattern > param > arr > arr > default_no_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[]] = [undefined, 4, 5];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [undefined, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
$('bad');
`````

## Uniformed

`````js filename=intro
var x = [x, 8, 8];
var x = [...x];
var x = x[8];
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [undefined, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
[...arrPatternStep];
$('bad');
`````
