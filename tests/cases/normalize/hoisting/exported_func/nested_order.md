# Preval test case

# nested_order.md

> normalize > hoisting > func > nested_order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(f());
export function f() {
  $(f(), g(), h());
    
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
export function f() {
  function f_1() {
    return $();
  }
  function g() {
    return $();
  }
  function h() {
    return $();
  }
  var tmpArg_1;
  var tmpArg_2;
  var tmpArg_3;
  tmpArg_1 = f_1();
  tmpArg_2 = g();
  tmpArg_3 = h();
  $(tmpArg_1, tmpArg_2, tmpArg_3);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
export function f() {
  function f_1() {
    return $();
  }
  function g() {
    return $();
  }
  function h() {
    return $();
  }
  var tmpArg_1;
  var tmpArg_2;
  var tmpArg_3;
  tmpArg_1 = f_1();
  tmpArg_2 = g();
  tmpArg_3 = h();
  $(tmpArg_1, tmpArg_2, tmpArg_3);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````