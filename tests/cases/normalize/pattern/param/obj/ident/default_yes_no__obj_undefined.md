# Preval test case

# default_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('pass') }) {
  return x;
}
$(f({ x: undefined }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: undefined };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  return x;
}
var x;
var x;
x = { x: x };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: undefined };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
