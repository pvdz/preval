# Preval test case

# default_no_no_no__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y] }) {
  return y;
}
$(f({ x: [], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat[0];
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: [], a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  var x = [...x];
  var x = x[8];
  return x;
}
var x;
var x;
x = { x: [], x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat[0];
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: [], a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
