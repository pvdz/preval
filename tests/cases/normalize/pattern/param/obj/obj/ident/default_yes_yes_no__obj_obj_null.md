# Preval test case

# default_yes_yes_no__obj_obj_null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: { x: 1, y: null, z: 3 }, b: 11, c: 12 }, 10));
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
  let y = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : objPatternBeforeDefault_1;
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 };
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
  let y = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : objPatternBeforeDefault_1;
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
