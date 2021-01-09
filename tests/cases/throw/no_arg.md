# Preval test case

# complex_sequence.md

> return > complex_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  throw f;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  throw f;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  throw x;
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f() {
  throw f;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
