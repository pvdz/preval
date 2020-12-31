# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > arr > obj > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('fail')] = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = null,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $('fail') : arrPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...null];
$('bad');
`````
