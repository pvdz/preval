# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > arr > obj > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{} = $('pass')] = '';
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = '',
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $('pass') : arrPatternBeforeDefault;
$('ok');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...''];
$('ok');
`````
