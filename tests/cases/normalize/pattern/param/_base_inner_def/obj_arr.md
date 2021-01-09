# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y = a ]}) { return y }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  var tmpTernaryTest;
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? a : arrPatternBeforeDefault;
  return y;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x = x.x;
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
