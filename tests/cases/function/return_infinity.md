# Preval test case

# return_string.md

> function > return_string
>
> A function that returns Infinity

## Input

`````js filename=intro
function f() {
  return Infinity;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return Infinity;
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
tmpArg = Infinity;
$(tmpArg);
`````
