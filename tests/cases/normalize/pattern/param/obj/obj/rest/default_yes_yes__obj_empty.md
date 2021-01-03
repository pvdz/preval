# Preval test case

# default_yes_yes__obj_empty.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_yes__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({}, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { x: { a: 'fail2' } }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1
    ? ((tmpArg_1 = { a: 'pass' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : objPatternBeforeDefault;
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_2;
tmpArg_2 = f({}, 10);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  var tmpTernaryTest_1;
  var tmpTernaryConsequent_1;
  var tmpArg_1;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest
    ? ((tmpArg = { x: { a: 'fail2' } }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
    : $tdz$__pattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  tmpTernaryTest_1 = objPatternBeforeDefault === undefined;
  let objPatternAfterDefault = tmpTernaryTest_1
    ? ((tmpArg_1 = { a: 'pass' }), (tmpTernaryConsequent_1 = $(tmpArg_1)), tmpTernaryConsequent_1)
    : objPatternBeforeDefault;
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_2;
tmpArg_2 = f({}, 10);
$(tmpArg_2);
`````