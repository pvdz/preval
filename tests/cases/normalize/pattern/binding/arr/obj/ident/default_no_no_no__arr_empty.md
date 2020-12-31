# Preval test case

# default_no_no_no__arr_empty.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = [];
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  x = arrPatternStep.x;
$('bad');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0];
$('bad');
`````
