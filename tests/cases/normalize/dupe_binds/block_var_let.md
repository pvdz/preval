# Preval test case

# func_param_let_shadow.md

> normalize > dupe_binds > func_param_let_shadow
>
> Func params can be shadowed by let 

Note that the outer `return` is dead code and so it's eliminated.

## Input

`````js filename=intro
function f(x) {
  {
    let x = $(1);
    return x;
  }
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f(x) {
  {
    let x_1 = $(1);
    return x_1;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f(x) {
  let x_1 = $(1);
  return x_1;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
