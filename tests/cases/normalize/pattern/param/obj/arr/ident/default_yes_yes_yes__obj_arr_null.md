# Preval test case

# default_yes_yes_yes__obj_arr_null.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_yes__obj_arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) } = $({ x: ['fail3'] })) {
  return y;
}
$(f({ x: [null], a: 11, b: 12 }, 10));
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
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { x: ['fail3'] }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1
    ? ((tmpArg_1 = ['fail2']), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : objPatternBeforeDefault;
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_2 = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest_2 ? 'fail' : arrPatternBeforeDefault;
  return y;
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = { x: [null], a: 11, b: 12 };
tmpArg_2 = f(tmpArg_3, 10);
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
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { x: ['fail3'] }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1
    ? ((tmpArg_1 = ['fail2']), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : objPatternBeforeDefault;
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest_2 = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest_2 ? 'fail' : arrPatternBeforeDefault;
  return y;
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = { x: [null], a: 11, b: 12 };
tmpArg_2 = f(tmpArg_3, 10);
$(tmpArg_2);
`````
