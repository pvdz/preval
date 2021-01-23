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
tmpArg = f();
tmpArg$1 = g();
tmpArg$2 = h();
$(tmpArg, tmpArg$1, tmpArg$2);
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
