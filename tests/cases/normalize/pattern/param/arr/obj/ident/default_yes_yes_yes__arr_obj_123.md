# Preval test case

# default_yes_yes_yes__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_yes__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('fail') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([{ x: 1, y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  var tmpTernaryTest_2;
  var tmpTernaryConsequent_2;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpElement = { x: 'fail3' }), (tmpArg = [tmpElement]), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest_1
    ? ((tmpArg_1 = { x: 'fail2' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : arrPatternBeforeDefault;
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest_2 = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_2 ? ((tmpTernaryConsequent_2 = $('fail')), tmpTernaryConsequent_2) : objPatternBeforeDefault;
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement_1;
tmpElement_1 = { x: 1, y: 2, z: 3 };
tmpArg_3 = [tmpElement_1, 20, 30];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  var tmpTernaryTest_2;
  var tmpTernaryConsequent_2;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpElement = { x: 'fail3' }), (tmpArg = [tmpElement]), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
  let arrPatternStep = tmpTernaryTest_1
    ? ((tmpArg_1 = { x: 'fail2' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : arrPatternBeforeDefault;
  let objPatternBeforeDefault = arrPatternStep.x;
  tmpTernaryTest_2 = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest_2 ? ((tmpTernaryConsequent_2 = $('fail')), tmpTernaryConsequent_2) : objPatternBeforeDefault;
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement_1;
tmpElement_1 = { x: 1, y: 2, z: 3 };
tmpArg_3 = [tmpElement_1, 20, 30];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````
