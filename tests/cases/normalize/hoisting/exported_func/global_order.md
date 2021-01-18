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
    let tmpStmtArg = $();
    return tmpStmtArg;
  }
}
export function g() {
  {
    let tmpStmtArg_1 = $();
    return tmpStmtArg_1;
  }
}
export function h() {
  {
    let tmpStmtArg_2 = $();
    return tmpStmtArg_2;
  }
}
var tmpArg;
var tmpArg_1;
var tmpArg_2;
tmpArg = f();
tmpArg_1 = g();
tmpArg_2 = h();
$(tmpArg, tmpArg_1, tmpArg_2);
`````

## Output

`````js filename=intro
export function f() {
  let tmpStmtArg = $();
  return tmpStmtArg;
}
export function g() {
  let tmpStmtArg_1 = $();
  return tmpStmtArg_1;
}
export function h() {
  let tmpStmtArg_2 = $();
  return tmpStmtArg_2;
}
var tmpArg;
var tmpArg_1;
var tmpArg_2;
tmpArg = f();
tmpArg_1 = g();
tmpArg_2 = h();
$(tmpArg, tmpArg_1, tmpArg_2);
`````

## Result

Should call `$` with:
["<crash[ Unexpected token 'export' ]>"];

Normalized calls: Same

Final output calls: Same
