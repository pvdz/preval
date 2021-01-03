# Preval test case

# default_yes_yes_yes__arr_arr_str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_yes__arr_arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])] = $(['fail3'])) {
  return x;
}
$(f([['abc', 201], 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  var tmpTernaryTest_2;
  var tmpTernaryConsequent_2;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = ['fail3']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest_1
    ? ((tmpArg_1 = ['fail2']), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
  tmpTernaryTest_2 = arrPatternBeforeDefault_1 === undefined;
  let x = tmpTernaryTest_2 ? ((tmpTernaryConsequent_2 = $('fail')), tmpTernaryConsequent_2) : arrPatternBeforeDefault_1;
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement;
tmpElement = ['abc', 201];
tmpArg_3 = [tmpElement, 4, 5];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  var tmpTernaryTest_2;
  var tmpTernaryConsequent_2;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = ['fail3']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest_1
    ? ((tmpArg_1 = ['fail2']), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
  tmpTernaryTest_2 = arrPatternBeforeDefault_1 === undefined;
  let x = tmpTernaryTest_2 ? ((tmpTernaryConsequent_2 = $('fail')), tmpTernaryConsequent_2) : arrPatternBeforeDefault_1;
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement;
tmpElement = ['abc', 201];
tmpArg_3 = [tmpElement, 4, 5];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````