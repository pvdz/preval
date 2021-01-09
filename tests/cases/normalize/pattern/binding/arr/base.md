# Preval test case

# base.md

> normalize > pattern >  > param > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = [1, 2, 3];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
const arrPatternSplat = [...bindingPatternArrRoot];
$('ok');
`````

## Uniformed

`````js filename=intro
var x = [8, 8, 8];
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
[...bindingPatternArrRoot];
$('ok');
`````
