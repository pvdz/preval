# Preval test case

# default_no__123.md

> normalize > pattern >  > param > arr > rest > default_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [...x] = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$('bad');
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = [...x];
var x = x.x(8);
x('str');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1];
arrPatternSplat.slice(0);
$('bad');
`````
