# Preval test case

# default_yes_yes__obj_123.md

> normalize > pattern >  > param > obj > ident > default_yes_yes__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') } = $({ x: 'fail2' })) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let x = $tdz$__pattern_after_default.x;
  if (x === undefined) {
    x = $('fail');
  }
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: 1, b: 2, c: 3 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { x: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let x = $tdz$__pattern_after_default.x;
  if (x === undefined) {
    x = $('fail');
  }
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: 1, b: 2, c: 3 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
