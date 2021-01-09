# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > arr > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = undefined;
const arrPatternSplat = [...bindingPatternArrRoot];
$('bad');
`````

## Uniformed

`````js filename=intro
var x = x;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
[...undefined];
$('bad');
`````
