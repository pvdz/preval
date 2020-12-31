# Preval test case

# default_yes_no__arr_str.md

> normalize > pattern > param >  > arr > arr > default_yes_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[] = $(['fail2'])] = ['abc', 4, 5];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['abc', 4, 5],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $(['fail2']) : arrPatternBeforeDefault,
  arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['abc', 4, 5],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $(['fail2']) : arrPatternBeforeDefault;
$('ok');
`````
