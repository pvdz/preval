# Preval test case

# default_yes_yes__obj_arr_empty_str.md

> normalize > pattern >  > param > obj > arr > default_yes_yes__obj_arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f({ x: [''], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { x: ['fail2'] }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  if (arrPatternStep === undefined) {
    tmpArg_1 = ['fail'];
    arrPatternStep = $(tmpArg_1);
  }
  let arrPatternSplat = [...arrPatternStep];
  return 'ok';
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = { x: [''], a: 11, b: 12 };
tmpArg_2 = f(tmpArg_3, 10);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { x: ['fail2'] }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  if (arrPatternStep === undefined) {
    tmpArg_1 = ['fail'];
    arrPatternStep = $(tmpArg_1);
  }
  return 'ok';
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = { x: [''], a: 11, b: 12 };
tmpArg_2 = f(tmpArg_3, 10);
$(tmpArg_2);
`````
