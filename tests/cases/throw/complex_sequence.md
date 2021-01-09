# Preval test case

# complex_sequence.md

> return > complex_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  throw ($(1), $(2), $(3));
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    $(1);
    $(2);
    let tmpStmtArg = $(3);
    throw tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  {
    x(8);
    x(8);
    var x = x(8);
    throw x;
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
  $(2);
  let tmpStmtArg = $(3);
  throw tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
