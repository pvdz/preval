# Preval test case

# default_yes_no__arr_undefined.md

> normalize > pattern > param >  > arr > arr > default_yes_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['pass2'])]) {
  return 'ok';
}
$(f([undefined, 4, 5], 200));
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
    ? ((tmpArg = ['pass2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  let arrPatternSplat_1 = [...arrPatternStep];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [undefined, 4, 5];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? ((x = ['str']), (x = x(x)), x) : x;
  var x = [...x];
  return 'str';
}
var x;
var x;
x = [x, 8, 8];
x = x(x, 8);
x(x);
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
    ? ((tmpArg = ['pass2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : arrPatternBeforeDefault;
  [...arrPatternStep];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [undefined, 4, 5];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````
