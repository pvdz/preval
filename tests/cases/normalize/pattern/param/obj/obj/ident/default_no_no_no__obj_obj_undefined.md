# Preval test case

# default_no_no_no__obj_obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y } }) {
  return y;
}
$(f({ x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternNoDefault.y;
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  var x = x.x;
  return x;
}
var x;
var x;
var x;
x = { x: 8, x: x, x: 8 };
x = { x: x, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternNoDefault.y;
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
