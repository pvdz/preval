# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x ]]) { return x }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1[0];
  return x;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  var x = [...x];
  var x = x[8];
  return x;
}
`````

## Output

`````js filename=intro

`````
