# Preval test case

# default_yes_no__arr_null.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('fail')] = [null, 20, 30];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [null, 20, 30],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $('fail') : arrPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [null, 20, 30],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0];
$('bad');
`````
