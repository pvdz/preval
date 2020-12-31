# Preval test case

# default_yes_yes_no__null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'fail2' })] = null;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = null,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $({ x: 'fail2' }) : arrPatternBeforeDefault,
  objPatternBeforeDefault = arrPatternStep.x,
  x = objPatternBeforeDefault === undefined ? $('pass') : objPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...null],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $({ x: 'fail2' }) : arrPatternBeforeDefault;
$('bad');
`````
