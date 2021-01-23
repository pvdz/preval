# Preval test case

# global_order.md

> normalize > hoisting > func > global_order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f(), g(), h());

export function f() { return $(); }
export function h() { return $(); }
export function g() { return $(); }
`````

## Normalized

`````js filename=intro
export function f() {
  {
    let tmpReturnArg = $();
    return tmpReturnArg;
  }
}
export function g() {
  {
    let tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
}
export function h() {
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
('<hoisted func decl `h`>');
('<hoisted func decl `g`>');
`````

## Output

`````js filename=intro
export function f() {
  let tmpReturnArg = $();
  return tmpReturnArg;
}
export function g() {
  let tmpReturnArg$1 = $();
  return tmpReturnArg$1;
}
export function h() {
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
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
