# Preval test case

# var.md

> normalize > ternary > var
>
> Example of rewriting a return statement with ternary

#TODO

## Input

`````js filename=intro
function f() {
  let a = 1, b = 2, c = 3;
  return a ? b : c;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = 1;
  let b = 2;
  let c = 3;
  if (a) {
    return b;
  } else {
    return c;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  var x = 8;
  var x = 8;
  var x = 8;
  if (x) {
    return x;
  } else {
    return x;
  }
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 2;
$(tmpArg);
`````
