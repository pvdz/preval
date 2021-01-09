# Preval test case

# return_sequence_prop.md

> normalize > sequence > return_sequence_prop
>
> Returning a member express on a sequence

#TODO

## Input

`````js filename=intro
function f() {
  return ($(1), $(2)).foo
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  {
    let tmpBindingInit = $(2);
    let tmpStmtArg = tmpBindingInit.foo;
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
    var x = x.x;
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
  let tmpBindingInit = $(2);
  let tmpStmtArg = tmpBindingInit.foo;
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
