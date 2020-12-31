# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = undefined,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $({ a: 'fail' }) : arrPatternBeforeDefault,
  x = objPatternRest(arrPatternStep, []);
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...undefined],
  arrPatternBeforeDefault = arrPatternSplat[0];
$('bad');
`````
