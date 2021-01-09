# Preval test case

# default_yes_yes_no__obj_arr_str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) }) {
  return y;
}
$(f({ x: ['abc'], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  var tmpTernaryTest_1;
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest
    ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest_1 ? 'fail' : arrPatternBeforeDefault;
  return y;
}
var tmpArg_1;
var tmpArg_2;
var tmpObjPropValue;
tmpObjPropValue = ['abc'];
tmpArg_2 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  var x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = ['str']), (x = x(x)), x) : x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? 'str' : x;
  return x;
}
var x;
var x;
var x;
x = ['str'];
x = { x: x, x: 8, x: 8 };
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
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest
    ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest_1 ? 'fail' : arrPatternBeforeDefault;
  return y;
}
var tmpArg_1;
var tmpArg_2;
var tmpObjPropValue;
tmpObjPropValue = ['abc'];
tmpArg_2 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
