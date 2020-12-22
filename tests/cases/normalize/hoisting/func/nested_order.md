# Preval test case

# nested_order.md

> normalize > hoisting > func > nested_order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f());
function f() {
  $(f(), g(), h());
    
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
function f() {
  function f_1() {
    return $();
  }
  function g() {
    return $();
  }
  function h() {
    return $();
  }
  $(f_1(), g(), h());
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  function f_1() {
    return $();
  }
  function g() {
    return $();
  }
  function h() {
    return $();
  }
  $(f_1(), g(), h());
}
$(f());
`````
