# Preval test case

# default_yes_yes_yes__arr_obj_undefined.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_yes__arr_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([{ x: undefined, y: 2, z: 3 }, 20, 30], 200));
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
    ? ((tmpElement = { x: 'fail3' }), (tmpArg = [tmpElement]), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg_1 = { x: 'fail2' };
    arrPatternStep = $(tmpArg_1);
  }
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = $('pass');
  }
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement_1;
tmpElement_1 = { x: undefined, y: 2, z: 3 };
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
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpElement = { x: 'fail3' }), (tmpArg = [tmpElement]), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg_1 = { x: 'fail2' };
    arrPatternStep = $(tmpArg_1);
  }
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = $('pass');
  }
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement_1;
tmpElement_1 = { x: undefined, y: 2, z: 3 };
tmpArg_3 = [tmpElement_1, 20, 30];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````
