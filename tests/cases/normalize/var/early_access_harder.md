# Preval test case

# early_access.md

> normalize > var > early_access
>
> Actual early access case

The difficult case here is that the temporal differs from the lexical.

Function `f` is defined at the start, updating `x`. But the first use of `x` happens before the declaration and before the update happens.

#TODO

## Input

`````js filename=intro
function f() {
  x = 10;
}
$(x); // We shouldn't break this being undefined
f();
var x; 
$(x);
`````

## Normalized

`````js filename=intro
function f() {
  x = 10;
}
var x;
$(x);
f();
$(x);
`````

## Uniformed

`````js filename=intro
function x() {
  x = 8;
}
var x;
x(x);
x();
x(x);
`````

## Output

`````js filename=intro
function f() {
  x = 10;
}
var x;
$(x);
f();
$(x);
`````
