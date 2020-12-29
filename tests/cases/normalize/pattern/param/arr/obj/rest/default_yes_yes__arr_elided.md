# Preval test case

# default_yes_yes__arr_elided.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_yes__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'pass' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f([, , , , 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpElement = { a: 'fail2' }), (tmpArg = [tmpElement]), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg_1 = { a: 'pass' };
    arrPatternStep = $(tmpArg_1);
  }
  let x = objPatternRest(arrPatternStep, []);
  return x;
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = [, , , , 20, 30];
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
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpElement = { a: 'fail2' }), (tmpArg = [tmpElement]), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg_1 = { a: 'pass' };
    arrPatternStep = $(tmpArg_1);
  }
  let x = objPatternRest(arrPatternStep, []);
  return x;
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = [, , , , 20, 30];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````
