# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x = a ]]) { return x }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  var tmpTernaryTest;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat_1[0];
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
