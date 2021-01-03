# Preval test case

# default_no_no_no__empty_str.md

> normalize > pattern >  > param > arr > arr > ident > default_no_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x]] = '';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = '';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1[0];
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...''];
const arrPatternStep = arrPatternSplat[0];
$('bad');
`````