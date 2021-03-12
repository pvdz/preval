# Preval test case

# global_order.md

> Normalize > Hoisting > Exported func named > Global order
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
let f = function () {
  const tmpReturnArg = $();
  return tmpReturnArg;
};
let g = function () {
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
};
let h = function () {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
};
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
const f = function () {
  const tmpReturnArg = $();
  return tmpReturnArg;
};
const g = function () {
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
};
const h = function () {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
};
const tmpCalleeParam = $();
const tmpCalleeParam$1 = $();
const tmpCalleeParam$2 = $();
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
