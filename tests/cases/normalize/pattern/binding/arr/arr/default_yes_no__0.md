# Preval test case

# default_yes_no__0.md

> normalize > pattern > param > arr > arr > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[] = $(['fail2'])] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 0,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $(['fail2']) : arrPatternBeforeDefault,
  arrPatternSplat_1 = [...arrPatternStep];
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0],
  arrPatternBeforeDefault = arrPatternSplat[0];
$('bad');
`````
