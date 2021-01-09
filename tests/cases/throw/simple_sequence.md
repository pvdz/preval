# Preval test case

# simple_sequence.md

> return > simple_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  throw ($(1), $(2), null);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    $(1);
    $(2);
    let tmpStmtArg = null;
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
    var x = /regex/;
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
  throw null;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
