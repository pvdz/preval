# Preval test case

# default_yes_no_no__123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return 'bad';
}
$(f(1, 2, 3));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return 'bad';
}
var tmpArg;
tmpArg = f(1, 2, 3);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x = [...x];
  var x = x[8];
  var x = x.x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  return 'str';
}
var x;
x = x(8, 8, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return 'bad';
}
var tmpArg;
tmpArg = f(1, 2, 3);
$(tmpArg);
`````
