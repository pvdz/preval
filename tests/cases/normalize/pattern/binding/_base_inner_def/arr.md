# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [ x = a ] = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternBeforeDefault = arrPatternSplat[0],
  x = arrPatternBeforeDefault === undefined ? a : arrPatternBeforeDefault;
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1];
`````
