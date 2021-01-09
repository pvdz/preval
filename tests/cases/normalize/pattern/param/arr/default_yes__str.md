# Preval test case

# default_yes__str.md

> normalize > pattern >  > param > arr > default_yes__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([] = $('fail')) {
  return 'ok';
}
$(f('xyz', 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  return 'ok';
}
var tmpArg;
tmpArg = f('xyz', 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x;
  x = x * x;
  var x = x ? ((x = x('str')), x) : x;
  var x = [...x];
  return 'str';
}
var x;
x = x('str', 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : $tdz$__pattern;
  [...$tdz$__pattern_after_default];
  return 'ok';
}
var tmpArg;
tmpArg = f('xyz', 200);
$(tmpArg);
`````
