# Preval test case

# default_yes_no__arr_str.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')]) {
  return 'ok';
}
$(f(['abc', 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
  return 'ok';
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
  var x;
  var x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  return 'str';
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
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = ['abc', 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
