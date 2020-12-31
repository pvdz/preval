# Preval test case

# default_yes_no__arr_str.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('pass')] = ['abc', 201];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['abc', 201],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  x = arrPatternBeforeDefault === undefined ? $('pass') : arrPatternBeforeDefault;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = ['abc', 201],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  x = arrPatternBeforeDefault === undefined ? $('pass') : arrPatternBeforeDefault;
$(x);
`````
