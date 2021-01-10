# Preval test case

# _base_call_func.md

> normalize > optional > _base_call_func
>
> Simple example

#TODO

## Input

`````js filename=intro
function f(){}
$(f?.());
`````

## Normalized

`````js filename=intro
function f() {}
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f();
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {}
var x;
var x;
var x;
x = x * x;
if (x) {
  x = x;
} else {
  x = x();
  x = x;
}
x(x);
`````

## Output

`````js filename=intro
function f() {}
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f();
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````
