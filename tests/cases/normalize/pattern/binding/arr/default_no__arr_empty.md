# Preval test case

# default_no__arr_empty.md

> normalize > pattern >  > param > arr > default_no__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
$('bad');
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
[...1];
$('bad');
`````
