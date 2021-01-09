# Preval test case

# default_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('pass')]) {
  return x;
}
$(f([, , , 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1.slice(0);
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [, , , 4, 5];
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
x = [, , , 8, 8];
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
  let arrPatternStep = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1.slice(0);
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [, , , 4, 5];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
