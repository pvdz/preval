# Preval test case

# nested_double.md

> normalize > hoisting > func > nested_double
>
> Note: not valid in global. Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

#TODO

## Input

`````js filename=intro
$(g());
function g() {
  $(f(3));
  function f() { return $(1); }
  function f() { return $(2); }
}
`````

## Normalized

`````js filename=intro
function g() {
  function f() {
    return $(1);
  }
  function f() {
    return $(2);
  }
  $(f(3));
}
$(g());
`````

## Output

`````js filename=intro
function g() {
  function f() {
    return $(1);
  }
  function f() {
    return $(2);
  }
  $(f(3));
}
$(g());
`````
