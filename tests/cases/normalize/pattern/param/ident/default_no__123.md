# Preval test case

# default_no__123.md

> normalize > pattern >  > param > ident > default_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f(1, 2, 3, 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__x) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__x === undefined;
  let x = tmpTernaryTest ? 'fail' : $tdz$__x;
  return x;
}
var tmpArg;
tmpArg = f(1, 2, 3, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__x) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__x === undefined;
  let x = tmpTernaryTest ? 'fail' : $tdz$__x;
  return x;
}
var tmpArg;
tmpArg = f(1, 2, 3, 200);
$(tmpArg);
`````