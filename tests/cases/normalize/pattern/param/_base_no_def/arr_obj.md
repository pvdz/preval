# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x }]) { return x}
`````

## Normalized

`````js filename=intro
function h(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  var x = x.x;
  return x;
}
`````

## Output

`````js filename=intro

`````
