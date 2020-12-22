# Preval test case

# global_order.md

> normalize > hoisting > func > global_order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(f(), g(), h());

function f() { return $(); }
function g() { return $(); }
function h() { return $(); }
`````

## Normalized

`````js filename=intro
function f() {
  return $();
}
function g() {
  return $();
}
function h() {
  return $();
}
$(f(), g(), h());
`````

## Output

`````js filename=intro
function f() {
  return $();
}
function g() {
  return $();
}
function h() {
  return $();
}
$(f(), g(), h());
`````
