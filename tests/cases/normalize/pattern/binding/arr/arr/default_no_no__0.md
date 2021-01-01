# Preval test case

# default_no_no__0.md

> normalize > pattern > param > arr > arr > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[]] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 0;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0];
$('bad');
`````
