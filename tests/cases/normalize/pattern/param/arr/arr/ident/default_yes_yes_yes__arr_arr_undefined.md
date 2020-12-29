# Preval test case

# default_yes_yes_yes__arr_arr_undefined.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_yes__arr_arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('pass')] = $(['fail2'])] = $(['fail3'])) {
  return x;
}
$(f([[undefined, 201], 4, 5], 200));
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
    ? ((tmpArg = ['fail3']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg_1 = ['fail2'];
    arrPatternStep = $(tmpArg_1);
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1[0];
  if (x === undefined) {
    x = $('pass');
  }
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement;
tmpElement = [undefined, 201];
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
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = ['fail3']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg_1 = ['fail2'];
    arrPatternStep = $(tmpArg_1);
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1[0];
  if (x === undefined) {
    x = $('pass');
  }
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement;
tmpElement = [undefined, 201];
tmpArg_3 = [tmpElement, 4, 5];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````
