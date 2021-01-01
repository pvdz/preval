# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = null;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = null;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...null];
const arrPatternStep = arrPatternSplat[0];
const x = objPatternRest(arrPatternStep, []);
$(x);
`````
