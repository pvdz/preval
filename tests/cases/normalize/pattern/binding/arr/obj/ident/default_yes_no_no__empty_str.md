# Preval test case

# default_yes_no_no__empty_str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') }] = '';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = '',
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  objPatternBeforeDefault = arrPatternStep.x,
  x = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...''],
  arrPatternStep = arrPatternSplat[0];
$('bad');
`````
