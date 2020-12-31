# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc',
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $({ a: 'fail' }) : arrPatternBeforeDefault,
  x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'],
  arrPatternBeforeDefault = arrPatternSplat[0],
  arrPatternStep = arrPatternBeforeDefault === undefined ? $({ a: 'fail' }) : arrPatternBeforeDefault,
  x = objPatternRest(arrPatternStep, []);
$(x);
`````
