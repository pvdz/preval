# Preval test case

# default_yes_no__arr_str.md

> normalize > pattern > param >  > arr > arr > default_yes_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])]) {
  return 'ok';
}
$(f(['abc', 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest
    ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = ['abc', 4, 5];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest
    ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = ['abc', 4, 5];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````