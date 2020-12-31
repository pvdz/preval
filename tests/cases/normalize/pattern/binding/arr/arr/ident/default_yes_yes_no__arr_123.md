# Preval test case

# default_yes_yes_no__arr_123.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')] = $(['pass2'])] = [1, 2, 3, , 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, , 4, 5],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $(['pass2']) : arrPatternBeforeDefault,
  arrPatternSplat_1 = [...arrPatternStep],
  arrPatternBeforeDefault_1 = arrPatternSplat_1[0],
  x = arrPatternBeforeDefault_1 === undefined ? $('fail') : arrPatternBeforeDefault_1;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3, , 4, 5],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $(['pass2']) : arrPatternBeforeDefault,
  arrPatternSplat_1 = [...arrPatternStep],
  arrPatternBeforeDefault_1 = arrPatternSplat_1[0],
  x = arrPatternBeforeDefault_1 === undefined ? $('fail') : arrPatternBeforeDefault_1;
$(x);
`````
