# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > arr > rest > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [...x] = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = undefined,
  arrPatternSplat = [...bindingPatternArrRoot],
  x = arrPatternSplat.slice(0);
$('bad');
`````

## Output

`````js filename=intro
$('bad');
`````
