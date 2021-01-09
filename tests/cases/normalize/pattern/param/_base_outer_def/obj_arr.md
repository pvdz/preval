# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y ]} = c ) { return y }
`````

## Normalized

`````js filename=intro
function i($tdz$__pattern) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? c : $tdz$__pattern;
  let objPatternNoDefault = $tdz$__pattern_after_default.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat[0];
  return y;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  x = x * x;
  var x = x ? x : x;
  var x = x.x;
  var x = [...x];
  var x = x[8];
  return x;
}
`````

## Output

`````js filename=intro

`````
