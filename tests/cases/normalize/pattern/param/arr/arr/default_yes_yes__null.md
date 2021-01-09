# Preval test case

# default_yes_yes__null.md

> normalize > pattern >  > param > arr > arr > default_yes_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])] = $(['fail3'])) {
  return 'bad';
}
$(f(null, 200));
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
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(null, 200);
$(tmpArg_2);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  x = x * x;
  var x = x ? ((x = ['str']), (x = x(x)), x) : x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? ((x = ['str']), (x = x(x)), x) : x;
  var x = [...x];
  return 'str';
}
var x;
x = x(/regex/, 8);
x(x);
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
  [...arrPatternStep];
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(null, 200);
$(tmpArg_2);
`````
