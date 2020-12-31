# Preval test case

# default_no_no__arr_empty_str.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = ['', 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['', 20, 30],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['', 20, 30],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  x = objPatternRest(arrPatternStep, []);
$(x);
`````
