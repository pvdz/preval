# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f([ x = a ]) { return x }
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let x = tmpTernaryTest ? a : arrPatternBeforeDefault;
  return x;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? x : x;
  return x;
}
`````

## Output

`````js filename=intro

`````
