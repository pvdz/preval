# Preval test case

# global_order.md

> normalize > hoisting > func > global_order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f(), g(), h());

export function f() { return $(); }
export function g() { return $(); }
export function h() { return $(); }
`````

## Normalized

`````js filename=intro
export function f() {
  return $();
}
export function g() {
  return $();
}
export function h() {
  return $();
}
$(f(), g(), h());
`````

## Output

`````js filename=intro
export function f() {
  return $();
}
export function g() {
  return $();
}
export function h() {
  return $();
}
$(f(), g(), h());
`````
