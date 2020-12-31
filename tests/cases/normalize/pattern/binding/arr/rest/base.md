# Preval test case

# base.md

> normalize > pattern >  > param > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [...x] = [1, 2, 3];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3],
  arrPatternSplat = [...bindingPatternArrRoot],
  x = arrPatternSplat.slice(0);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3],
  arrPatternSplat = [...bindingPatternArrRoot],
  x = arrPatternSplat.slice(0);
$(x);
`````
