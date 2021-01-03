# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })]) {
  return x;
}
$(f('abc'));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest
    ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
  return x;
}
var tmpArg_1;
tmpArg_1 = f('abc');
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest
    ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault;
  return x;
}
var tmpArg_1;
tmpArg_1 = f('abc');
$(tmpArg_1);
`````