# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x }] = c ) { return x}
`````

## Normalized

`````js filename=intro
function h($tdz$__pattern) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? c : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  x = x * x;
  var x = x ? x : x;
  var x = [...x];
  var x = x[8];
  var x = x.x;
  return x;
}
`````

## Output

`````js filename=intro

`````
