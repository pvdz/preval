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
  {
    let tmpReturnArg = $();
    return tmpReturnArg;
  }
}
function g() {
  {
    let tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
}
function h() {
  {
    let tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  }
}
var tmpArg;
var tmpArg$1;
var tmpArg$2;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg$2` decl without init>');
tmpArg = f();
tmpArg$1 = g();
tmpArg$2 = h();
$(tmpArg, tmpArg$1, tmpArg$2);
('<hoisted func decl `f`>');
('<hoisted func decl `g`>');
('<hoisted func decl `h`>');
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg = $();
  return tmpReturnArg;
}
function g() {
  let tmpReturnArg$1 = $();
  return tmpReturnArg$1;
}
function h() {
  let tmpReturnArg$2 = $();
  return tmpReturnArg$2;
}
var tmpArg;
var tmpArg$1;
var tmpArg$2;
tmpArg = f();
tmpArg$1 = g();
tmpArg$2 = h();
$(tmpArg, tmpArg$1, tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 
 - 2: 
 - 3: null,null,null
 - 4: undefined

Normalized calls: Same

Final output calls: Same
