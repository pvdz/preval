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
let f = function () {
  const tmpReturnArg = $();
  return tmpReturnArg;
};
let g = function () {
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpAnonDefaultExport = function () {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
};
export { tmpAnonDefaultExport as default };
export { f };
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
const tmpCalleeParam = $();
const tmpCalleeParam$1 = $();
$(tmpCalleeParam, tmpCalleeParam$1);
const tmpAnonDefaultExport = function () {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
};
export { tmpAnonDefaultExport as default };
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
