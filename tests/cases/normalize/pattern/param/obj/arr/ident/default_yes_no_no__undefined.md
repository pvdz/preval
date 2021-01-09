# Preval test case

# default_yes_no_no__undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] }) {
  return 'bad';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? 'fail' : arrPatternBeforeDefault;
  return 'bad';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x = x.x;
  var x = [...x];
  var x = x[8];
  x = x * x;
  var x = x ? 'str' : x;
  return 'str';
}
var x;
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  tmpTernaryTest ? 'fail' : arrPatternBeforeDefault;
  return 'bad';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````
