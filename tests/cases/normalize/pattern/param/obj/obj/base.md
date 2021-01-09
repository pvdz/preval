# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = a } = b) {
  return 'ok';
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? b : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1 ? a : objPatternBeforeDefault;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  x = x * x;
  var x = x ? x : x;
  var x = x.x;
  x = x * x;
  var x = x ? x : x;
  return 'str';
}
var x;
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = { x: x, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? b : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  tmpTernaryTest_1 ? a : objPatternBeforeDefault;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
