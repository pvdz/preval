# Preval test case

# base.md

> normalize > pattern >  > param > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x]) {
  return x;
}
$(f([1, 2, 3], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat.slice(0);
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [1, 2, 3];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x.x(8);
  return x;
}
var x;
var x;
x = [8, 8, 8];
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat.slice(0);
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [1, 2, 3];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
