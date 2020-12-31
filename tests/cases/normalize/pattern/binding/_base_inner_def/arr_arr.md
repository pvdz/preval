# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [[ x = a ]] = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1,
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  arrPatternBeforeDefault = arrPatternSplat_1[0],
  x = arrPatternBeforeDefault === undefined ? a : arrPatternBeforeDefault;
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep];
`````
