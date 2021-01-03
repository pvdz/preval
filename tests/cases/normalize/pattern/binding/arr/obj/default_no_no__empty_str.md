# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > arr > obj > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{}] = '';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = '';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
$('bad');
`````

## Output

`````js filename=intro
$('bad');
`````