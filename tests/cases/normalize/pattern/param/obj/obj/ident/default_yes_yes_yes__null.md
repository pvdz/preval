# Preval test case

# default_yes_yes_yes__null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'fail3' } })) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  var tmpTernaryTest_2;
  var tmpTernaryConsequent_2;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpObjPropValue = { y: 'fail3' }), (tmpArg = { x: tmpObjPropValue }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1
    ? ((tmpArg_1 = { y: 'fail2' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : objPatternBeforeDefault;
  let objPatternBeforeDefault_1 = objPatternAfterDefault.y;
  tmpTernaryTest_2 = objPatternBeforeDefault_1 === undefined;
  let y = tmpTernaryTest_2 ? ((tmpTernaryConsequent_2 = $('fail')), tmpTernaryConsequent_2) : objPatternBeforeDefault_1;
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(null, 10);
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
  var x = x ? ((x = { x: 'str' }), (x = { x: x }), (x = x(x)), x) : x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  return 'str';
}
var x;
x = x(/regex/, 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  var tmpTernaryTest_2;
  var tmpTernaryConsequent_2;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpObjPropValue = { y: 'fail3' }), (tmpArg = { x: tmpObjPropValue }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1
    ? ((tmpArg_1 = { y: 'fail2' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : objPatternBeforeDefault;
  let objPatternBeforeDefault_1 = objPatternAfterDefault.y;
  tmpTernaryTest_2 = objPatternBeforeDefault_1 === undefined;
  tmpTernaryTest_2 ? ((tmpTernaryConsequent_2 = $('fail')), tmpTernaryConsequent_2) : objPatternBeforeDefault_1;
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(null, 10);
$(tmpArg_2);
`````
