# Preval test case

# default_yes_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('pass') } }) {
  return y;
}
$(f({ x: '', b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: '', b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: '', b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
