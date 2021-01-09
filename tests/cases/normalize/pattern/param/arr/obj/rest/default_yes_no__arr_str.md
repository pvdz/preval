# Preval test case

# default_yes_no__arr_str.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'pass' })]) {
  return x;
}
$(f(['abc', 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest
    ? ((tmpArg = { a: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let x = objPatternRest(arrPatternStep, []);
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = ['abc', 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
  var x = x(x, []);
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
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest
    ? ((tmpArg = { a: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let x = objPatternRest(arrPatternStep, []);
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = ['abc', 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````
