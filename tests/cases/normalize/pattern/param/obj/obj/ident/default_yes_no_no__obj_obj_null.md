# Preval test case

# default_yes_no_no__obj_obj_null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return y;
}
$(f({ x: { x: 1, y: null, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: null, z: 3 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x = x.x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  return x;
}
var x;
var x;
var x;
x = { x: 8, x: /regex/, x: 8 };
x = { x: x, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: null, z: 3 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
