# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let x = 1;
function f([ x ]) {
  { let x = 2; }
  return x
}
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x_1 = arrPatternSplat[0];
  {
    let x_2 = 2;
  }
  return x_1;
}
let x = 1;
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  {
    var x = 8;
  }
  return x;
}
var x = 8;
`````

## Output

`````js filename=intro

`````
