# Preval test case

# simple_sequence.md

> return > simple_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  return ($(1), $(2), null);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  return null;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  $(2);
  return null;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
