# Preval test case

# global_order.md

> Normalize > Hoisting > Exported func default anon > Global order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f(), g());

export function f() { return $(); }
export default function() { return $(); }
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
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
export default function () {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
}
export { f };
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
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
$(tmpCalleeParam, tmpCalleeParam$1);
export default function () {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
}
export { f };
export { g };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same