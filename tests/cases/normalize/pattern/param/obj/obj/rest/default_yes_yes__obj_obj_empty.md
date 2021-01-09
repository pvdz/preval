# Preval test case

# default_yes_yes__obj_obj_empty.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_yes__obj_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({ x: {}, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpObjPropValue = { a: 'fail2' }), (tmpArg = { x: tmpObjPropValue }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1
    ? ((tmpArg_1 = { a: 'fail' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : objPatternBeforeDefault;
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = { x: {}, b: 11, c: 12 };
tmpArg_2 = f(tmpArg_3, 10);
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
  var x;
  x = x * x;
  var x = x ? ((x = { x: 'str' }), (x = { x: x }), (x = x(x)), x) : x;
  var x = x.x;
  x = x * x;
  var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
  var x = x(x, []);
  return x;
}
var x;
var x;
x = { x: {}, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpObjPropValue = { a: 'fail2' }), (tmpArg = { x: tmpObjPropValue }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1
    ? ((tmpArg_1 = { a: 'fail' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : objPatternBeforeDefault;
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = { x: {}, b: 11, c: 12 };
tmpArg_2 = f(tmpArg_3, 10);
$(tmpArg_2);
`````
