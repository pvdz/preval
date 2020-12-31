# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x]] = '';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = '',
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  x = arrPatternSplat_1.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...''],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  x = arrPatternSplat_1.slice(0);
$(x);
`````
