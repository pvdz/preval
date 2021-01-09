# Preval test case

# default_yes_no__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'ok';
}
$(f({ x: [], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest
    ? ((tmpArg = ['fail']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  let arrPatternSplat = [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: [], a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = ['str']), (x = x(x)), x) : x;
  var x = [...x];
  return 'str';
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
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest
    ? ((tmpArg = ['fail']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: [], a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
