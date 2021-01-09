# Preval test case

# default_no_no_no__arr_str.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x }]) {
  return x;
}
$(f(['abc', 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = ['abc', 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  var x = x.x;
  return x;
}
var x;
var x;
x = ['str', 8, 8];
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = ['abc', 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
