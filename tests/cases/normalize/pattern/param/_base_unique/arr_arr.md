# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let x = 1;
function i([[ x ]]) {
  { let x = 2; }
  return x
}
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let x_1 = arrPatternSplat_1[0];
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
