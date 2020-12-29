# Preval test case

# default_yes_yes__empty.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_yes__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['fail']) } = $({ x: ['pass2'] })) {
  return y;
}
$(f());
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
    ? ((tmpArg = { x: ['pass2'] }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  if (arrPatternStep === undefined) {
    tmpArg_1 = ['fail'];
    arrPatternStep = $(tmpArg_1);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat.slice(0);
  return y;
}
var tmpArg_2;
tmpArg_2 = f();
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
    ? ((tmpArg = { x: ['pass2'] }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  if (arrPatternStep === undefined) {
    tmpArg_1 = ['fail'];
    arrPatternStep = $(tmpArg_1);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat.slice(0);
  return y;
}
var tmpArg_2;
tmpArg_2 = f();
$(tmpArg_2);
`````
