# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [{ x = a }] = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  objPatternBeforeDefault = arrPatternStep.x,
  x = objPatternBeforeDefault === undefined ? a : objPatternBeforeDefault;
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1],
  arrPatternStep = arrPatternSplat[0];
`````
