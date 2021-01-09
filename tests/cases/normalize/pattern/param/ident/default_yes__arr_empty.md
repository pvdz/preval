# Preval test case

# default_yes__arr_empty.md

> normalize > pattern >  > param > ident > default_yes__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f($tdz$__x) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__x === undefined;
  let x = tmpTernaryTest ? 'pass' : $tdz$__x;
  return x;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  x = x * x;
  var x = x ? 'str' : x;
  return x;
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__x) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__x === undefined;
  let x = tmpTernaryTest ? 'pass' : $tdz$__x;
  return x;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
