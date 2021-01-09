# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x ]] = c ) { return x }
`````

## Normalized

`````js filename=intro
function i($tdz$__pattern) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? c : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1[0];
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
  var x = [...x];
  var x = x[8];
  return x;
}
`````

## Output

`````js filename=intro

`````
