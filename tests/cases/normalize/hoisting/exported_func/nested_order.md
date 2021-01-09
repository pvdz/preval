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
    {
      let tmpStmtArg = $();
      return tmpStmtArg;
    }
  }
  function g() {
    {
      let tmpStmtArg_1 = $();
      return tmpStmtArg_1;
    }
  }
  function h() {
    {
      let tmpStmtArg_2 = $();
      return tmpStmtArg_2;
    }
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

## Uniformed

`````js filename=intro
export function x() {
  function x() {
    {
      var x = x();
      return x;
    }
  }
  function x() {
    {
      var x = x();
      return x;
    }
  }
  function x() {
    {
      var x = x();
      return x;
    }
  }
  var x;
  var x;
  var x;
  x = x();
  x = x();
  x = x();
  x(x, x, x);
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
export function f() {
  function f_1() {
    let tmpStmtArg = $();
    return tmpStmtArg;
  }
  function g() {
    let tmpStmtArg_1 = $();
    return tmpStmtArg_1;
  }
  function h() {
    let tmpStmtArg_2 = $();
    return tmpStmtArg_2;
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
