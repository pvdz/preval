# Preval test case

# default_no_no_no__arr_123.md

> normalize > pattern >  > param > arr > arr > ident > default_no_no_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x]] = [1, 2, 3, 4, 5];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1[0];
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
$('bad');
`````