# Preval test case

# default_yes_yes_no__arr_123.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])]) {
  return x;
}
$(f([1, 2, 3, , 4, 5], 200));
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
    ? ((tmpArg = ['pass2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault_1 === undefined;
  let x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : arrPatternBeforeDefault_1;
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [1, 2, 3, , 4, 5];
tmpArg_1 = f(tmpArg_2, 200);
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
    ? ((tmpArg = ['pass2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault_1 === undefined;
  let x = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : arrPatternBeforeDefault_1;
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [1, 2, 3, , 4, 5];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````
