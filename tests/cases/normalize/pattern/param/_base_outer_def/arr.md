# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f([ x ] = b) { return x }
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? b : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let x = arrPatternSplat[0];
  return x;
}
`````

## Output

`````js filename=intro

`````
