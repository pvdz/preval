# Preval test case

# default_yes__123.md

> normalize > pattern >  > param > obj > default_yes__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f(1, 2, 3, 10));
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
tmpArg = f(1, 2, 3, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  return 'ok';
}
var tmpArg;
tmpArg = f(1, 2, 3, 10);
$(tmpArg);
`````