# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > rest > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'pass' })) {
  return x;
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { a: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let x = objPatternRest($tdz$__pattern_after_default, []);
  return x;
}
var tmpArg_1;
tmpArg_1 = f(undefined, 10);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  var x;
  x = x * x;
  var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
  var x = x(x, []);
  return x;
}
var x;
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { a: 'pass' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let x = objPatternRest($tdz$__pattern_after_default, []);
  return x;
}
var tmpArg_1;
tmpArg_1 = f(undefined, 10);
$(tmpArg_1);
`````
