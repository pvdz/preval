# Preval test case

# default_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'pass' })] = [, , , , 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [, , , , 20, 30],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $({ a: 'pass' }) : arrPatternBeforeDefault,
  x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [, , , , 20, 30],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $({ a: 'pass' }) : arrPatternBeforeDefault,
  x = objPatternRest(arrPatternStep, []);
$(x);
`````
