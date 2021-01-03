# Preval test case

# default_no_no__arr_str.md

> normalize > pattern >  > param > arr > obj > default_no_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{}] = ['abc', 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['abc', 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['abc', 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
$('ok');
`````
