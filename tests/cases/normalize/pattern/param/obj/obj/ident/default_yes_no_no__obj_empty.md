# Preval test case

# default_yes_no_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return 'bad';
}
$(f({}, 10));
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
tmpArg = f({}, 10);
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
  return 'bad';
}
var tmpArg;
tmpArg = f({}, 10);
$(tmpArg);
`````