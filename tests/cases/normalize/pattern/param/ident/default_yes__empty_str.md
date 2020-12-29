# Preval test case

# default_yes__empty_str.md

> normalize > pattern >  > param > ident > default_yes__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f('', 200));
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
tmpArg = f('', 200);
$(tmpArg);
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
tmpArg = f('', 200);
$(tmpArg);
`````
