# Preval test case

# default_yes_no__arr_arr_123.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__arr_arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('fail')]) {
  return x;
}
$(f([[1, 2, 3], 4, 5], 200));
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
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1.slice(0);
  return x;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = [1, 2, 3];
tmpArg_1 = [tmpElement, 4, 5];
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
  var x = [...x];
  var x = x.x(8);
  return x;
}
var x;
var x;
var x;
x = [8, 8, 8];
x = [x, 8, 8];
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
  let arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1.slice(0);
  return x;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = [1, 2, 3];
tmpArg_1 = [tmpElement, 4, 5];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
