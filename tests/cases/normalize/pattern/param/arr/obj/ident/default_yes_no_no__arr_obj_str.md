# Preval test case

# default_yes_no_no__arr_obj_str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('fail') }]) {
  return x;
}
$(f([{ x: 'abc', y: 2, z: 3 }, 20, 30], 200));
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
  let x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return x;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = { x: 'abc', y: 2, z: 3 };
tmpArg_1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
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
  let x = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : objPatternBeforeDefault;
  return x;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = { x: 'abc', y: 2, z: 3 };
tmpArg_1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````