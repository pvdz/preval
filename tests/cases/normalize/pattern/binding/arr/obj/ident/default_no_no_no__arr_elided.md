# Preval test case

# default_no_no_no__arr_elided.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = [, , , 1, 20, 30];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [, , , 1, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$('bad');
`````

## Uniformed

`````js filename=intro
var x = [, , , 8, 8, 8];
var x = [...x];
var x = x[8];
var x = x.x;
x('str');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [, , , 1, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
arrPatternStep.x;
$('bad');
`````
