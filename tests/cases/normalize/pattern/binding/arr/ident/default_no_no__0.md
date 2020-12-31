# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > arr > ident > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 0,
  arrPatternSplat = [...bindingPatternArrRoot],
  x = arrPatternSplat[0];
$('bad');
`````

## Output

`````js filename=intro
$('bad');
`````
