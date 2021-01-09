# Preval test case

# end.md

> normalize > sequence > end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
function f() {
  ($(1), $(2), ($(3), $(4)), $(5), $(6));
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  x(8);
  x(8);
  x(8);
  x(8);
  x(8);
  x(8);
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
  $(3);
  $(4);
  $(5);
  $(6);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
