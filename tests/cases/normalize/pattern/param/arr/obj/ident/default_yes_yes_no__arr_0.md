# Preval test case

# default_yes_yes_no__arr_0.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })]) {
  return x;
}
$(f([0, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest
    ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [0, 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  var x;
  var x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
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
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest
    ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [0, 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````
