# Preval test case

# default_no_no__str.md

> normalize > pattern > param > arr > arr > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[]] = 'abc';
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'];
$('ok');
`````