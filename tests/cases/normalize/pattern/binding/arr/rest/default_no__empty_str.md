# Preval test case

# default_no__empty_str.md

> normalize > pattern >  > param > arr > rest > default_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [...x] = '';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = '',
  arrPatternSplat = [...bindingPatternArrRoot],
  x = arrPatternSplat.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...''],
  x = arrPatternSplat.slice(0);
$(x);
`````
