# Preval test case

# default_yes_yes_yes__undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_yes__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) } = $({ x: ['pass3'] })) {
  return y;
}
$(f(undefined, 10));
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
    ? ((tmpArg = { x: ['pass3'] }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  if (arrPatternStep === undefined) {
    tmpArg_1 = ['fail2'];
    arrPatternStep = $(tmpArg_1);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  if (y === undefined) {
    y = 'fail';
  }
  return y;
}
var tmpArg_2;
tmpArg_2 = f(undefined, 10);
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
    ? ((tmpArg = { x: ['pass3'] }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  if (arrPatternStep === undefined) {
    tmpArg_1 = ['fail2'];
    arrPatternStep = $(tmpArg_1);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  if (y === undefined) {
    y = 'fail';
  }
  return y;
}
var tmpArg_2;
tmpArg_2 = f(undefined, 10);
$(tmpArg_2);
`````
