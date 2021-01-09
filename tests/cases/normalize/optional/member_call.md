# Preval test case

# member_call.md

> normalize > optional > member_call
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
function f(){ return 10; }
$(f?.());
`````

## Normalized

`````js filename=intro
function f() {
  return 10;
}
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f()), tmpTernaryAlternate);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  return 8;
}
var x;
var x;
var x;
x = x * x;
x = x ? x : ((x = x()), x);
x(x);
`````

## Output

`````js filename=intro
function f() {
  return 10;
}
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f()), tmpTernaryAlternate);
$(tmpArg);
`````
