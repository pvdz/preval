# Preval test case

# default_no_no_no__str.md

> normalize > pattern >  > param > arr > arr > ident > default_no_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x]] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc',
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  x = arrPatternSplat_1[0];
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  x = arrPatternSplat_1[0];
$(x);
`````
