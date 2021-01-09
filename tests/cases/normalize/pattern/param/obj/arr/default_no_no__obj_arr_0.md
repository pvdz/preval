# Preval test case

# default_no_no__obj_arr_0.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] }) {
  return 'ok';
}
$(f({ x: [0], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = [0];
tmpArg_1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  var x = [...x];
  return 'str';
}
var x;
var x;
var x;
x = [8];
x = { x: x, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  [...objPatternNoDefault];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = [0];
tmpArg_1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
