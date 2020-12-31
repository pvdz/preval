# Preval test case

# default_yes_yes_no__obj_obj_empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('pass') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: {}, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest
    ? ((tmpArg = { y: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  let objPatternBeforeDefault_1 = objPatternAfterDefault.y;
  tmpTernaryTest_1 = objPatternBeforeDefault_1 === undefined;
  let y = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault_1;
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: {}, b: 11, c: 12 };
tmpArg_1 = f(tmpArg_2, 10);
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
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest
    ? ((tmpArg = { y: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : objPatternBeforeDefault;
  let objPatternBeforeDefault_1 = objPatternAfterDefault.y;
  tmpTernaryTest_1 = objPatternBeforeDefault_1 === undefined;
  let y = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('pass')), tmpTernaryConsequent_1) : objPatternBeforeDefault_1;
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: {}, b: 11, c: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
