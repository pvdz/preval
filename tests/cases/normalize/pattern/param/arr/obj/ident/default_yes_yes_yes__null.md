# Preval test case

# default_yes_yes_yes__null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return 'bad';
}
$(f(null));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  var tmpTernaryTest_2;
  var tmpTernaryConsequent_2;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpElement = { x: 'fail3' }), (tmpArg = [tmpElement]), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest_1
    ? ((tmpArg_1 = { x: 'fail2' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : arrPatternBeforeDefault;
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest_2 = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_2 ? ((tmpTernaryConsequent_2 = $('pass')), tmpTernaryConsequent_2) : objPatternBeforeDefault;
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(null);
$(tmpArg_2);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  x = x * x;
  var x = x ? ((x = { x: 'str' }), (x = [x]), (x = x(x)), x) : x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  return 'str';
}
var x;
x = x(/regex/);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  var tmpTernaryTest_2;
  var tmpTernaryConsequent_2;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpElement = { x: 'fail3' }), (tmpArg = [tmpElement]), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest_1
    ? ((tmpArg_1 = { x: 'fail2' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : arrPatternBeforeDefault;
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest_2 = objPatternBeforeDefault === undefined;
  tmpTernaryTest_2 ? ((tmpTernaryConsequent_2 = $('pass')), tmpTernaryConsequent_2) : objPatternBeforeDefault;
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(null);
$(tmpArg_2);
`````
