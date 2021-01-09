# Preval test case

# default_yes__undefined.md

> normalize > pattern >  > param > obj > default_yes__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : $tdz$__pattern;
  return 'ok';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  return 'str';
}
var x;
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : $tdz$__pattern;
  return 'ok';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````
