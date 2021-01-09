# Preval test case

# default_yes_no_no__null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x = x.x;
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
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return 'bad';
}
var tmpArg;
tmpArg = f(null, 10);
$(tmpArg);
`````
