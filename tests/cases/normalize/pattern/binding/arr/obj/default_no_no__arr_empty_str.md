# Preval test case

# default_no_no__arr_empty_str.md

> normalize > pattern >  > param > arr > obj > default_no_no__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{}] = ['', 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['', 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
$('ok');
`````

## Uniformed

`````js filename=intro
var x = ['str', 8, 8];
var x = [...x];
var x = x[8];
x('str');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['', 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
$('ok');
`````
