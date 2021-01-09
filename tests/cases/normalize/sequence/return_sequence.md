# Preval test case

# return_sequence.md

> normalize > sequence > return_sequence
>
> Returning a sequence

#TODO

## Input

`````js filename=intro
function f() {
  return ($(1), $(2))
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  {
    let tmpStmtArg = $(2);
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  x(8);
  {
    var x = x(8);
    return x;
  }
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  let tmpStmtArg = $(2);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
