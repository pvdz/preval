# Preval test case

# default_yes__obj_empty.md

> normalize > pattern >  > param > obj > default_yes__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'ok';
}
$(f({}, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail')), tmpTernaryConsequent) : $tdz$__pattern;
  return 'ok';
}
var tmpArg;
tmpArg = f({}, 10);
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
tmpArg = f({}, 10);
$(tmpArg);
`````