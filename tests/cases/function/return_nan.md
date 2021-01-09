# Preval test case

# return_string.md

> function > return_string
>
> A function that returns NaN

## Input

`````js filename=intro
function f() {
  return NaN;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return NaN;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  return x;
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = NaN;
$(tmpArg);
`````
