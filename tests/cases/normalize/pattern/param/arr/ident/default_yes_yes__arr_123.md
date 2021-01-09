# Preval test case

# default_yes_yes__arr_123.md

> normalize > pattern >  > param > arr > ident > default_yes_yes__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')] = $('fail2')) {
  return x;
}
$(f([1, 2, 3], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail2')), tmpTernaryConsequent) : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : arrPatternBeforeDefault;
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [1, 2, 3];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  var x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  var x = [...x];
  var x = x[8];
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
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail2')), tmpTernaryConsequent) : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : arrPatternBeforeDefault;
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [1, 2, 3];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
