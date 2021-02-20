# Preval test case

# global_order.md

> Normalize > Hoisting > Exported func > Global order
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
function f() {
  const tmpReturnArg = $();
  return tmpReturnArg;
}
function g() {
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
}
function h() {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
const tmpCalleeParam$2 = h();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
export { f };
export { h };
export { g };
`````

## Output

`````js filename=intro
function f() {
  const tmpReturnArg = $();
  return tmpReturnArg;
}
function g() {
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
}
function h() {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
}
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
const tmpCalleeParam$2 = h();
$(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
export { f };
export { h };
export { g };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
