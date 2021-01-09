# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) }) {
  return y;
}
$(f('abc', 10));
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
    ? ((tmpArg = { a: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_1;
tmpArg_1 = f('abc', 10);
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
  var x = x(x, []);
  return x;
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
  let objPatternAfterDefault = tmpTernaryTest
    ? ((tmpArg = { a: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_1;
tmpArg_1 = f('abc', 10);
$(tmpArg_1);
`````
