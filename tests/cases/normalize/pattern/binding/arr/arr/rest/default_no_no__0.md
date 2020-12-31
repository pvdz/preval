# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x]] = 0;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 0,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  x = arrPatternSplat_1.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  x = arrPatternSplat_1.slice(0);
$(x);
`````
