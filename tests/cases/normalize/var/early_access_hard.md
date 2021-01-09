# Preval test case

# early_access.md

> normalize > var > early_access
>
> Actual early access case

The difficult case here is that the temporal differs from the lexical.

Function `f` is declared at the end, appearing after the `var` statement in the source code. Should `x` be updated here? No, because `f` is hoisted.

#TODO

## Input

`````js filename=intro
$(f()); // We shouldn't break this being undefined
var x = 10; 
$(f());
function f() {
  return x;
}
`````

## Normalized

`````js filename=intro
function f() {
  return x;
}
var tmpArg;
var x;
var tmpArg_1;
tmpArg = f();
$(tmpArg);
x = 10;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f() {
  return x;
}
var tmpArg;
var x;
var tmpArg_1;
tmpArg = f();
$(tmpArg);
x = 10;
tmpArg_1 = f();
$(tmpArg_1);
`````