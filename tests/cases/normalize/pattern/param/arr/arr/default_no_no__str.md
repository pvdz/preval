# Preval test case

# default_no_no__str.md

> normalize > pattern > param > arr > arr > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[]]) {
  return 'ok';
}
$(f('abc', 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  return 'ok';
}
var tmpArg;
tmpArg = f('abc', 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  var x = [...x];
  return 'str';
}
var x;
x = x('str', 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  [...arrPatternStep];
  return 'ok';
}
var tmpArg;
tmpArg = f('abc', 200);
$(tmpArg);
`````
