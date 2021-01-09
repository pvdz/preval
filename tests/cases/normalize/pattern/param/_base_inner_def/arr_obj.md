# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x = a }]) { return x}
`````

## Normalized

`````js filename=intro
function h(tmpParamPattern) {
  var tmpTernaryTest;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest ? a : objPatternBeforeDefault;
  return x;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x = [...x];
  var x = x[8];
  var x = x.x;
  x = x * x;
  var x = x ? x : x;
  return x;
}
`````

## Output

`````js filename=intro

`````
