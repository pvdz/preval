# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > arr > ident > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = null;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$('bad');
`````

## Uniformed

`````js filename=intro
var x = /regex/;
var x = [...x];
var x = x[8];
x('str');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...null];
arrPatternSplat[0];
$('bad');
`````
