# Preval test case

# default_yes_no__0.md

> normalize > pattern >  > param > arr > ident > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('fail')] = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 0,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  x = arrPatternBeforeDefault === undefined ? $('fail') : arrPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0];
$('bad');
`````
