# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > obj > obj > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) }) {
  return 'ok';
}
$(f('', 10));
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
    ? ((tmpArg = { x: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f('', 10);
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
  var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
  return 'str';
}
var x;
x = x('str', 8);
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
  tmpTernaryTest ? ((tmpArg = { x: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent) : objPatternBeforeDefault;
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f('', 10);
$(tmpArg_1);
`````
