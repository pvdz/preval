# Preval test case

# default_yes_no__arr_arr_123.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__arr_arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x] = $('fail')] = [[1, 2, 3], 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = [1, 2, 3]), [tmpElement, 4, 5]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $('fail') : arrPatternBeforeDefault,
  arrPatternSplat_1 = [...arrPatternStep],
  x = arrPatternSplat_1.slice(0);
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = [1, 2, 3]), [tmpElement, 4, 5]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $('fail') : arrPatternBeforeDefault,
  arrPatternSplat_1 = [...arrPatternStep],
  x = arrPatternSplat_1.slice(0);
$(x);
`````
