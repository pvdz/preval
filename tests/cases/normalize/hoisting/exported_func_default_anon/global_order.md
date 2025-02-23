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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $();
};
let g = function () {
  debugger;
  return $();
};
$(f(), g());
const tmpAnonDefaultExport = function () {
  debugger;
  return $();
};
export { tmpAnonDefaultExport as default };
export { f };
export { g };
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $();
  return tmpReturnArg;
};
let g = function () {
  debugger;
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpAnonDefaultExport = function () {
  debugger;
  const tmpReturnArg$3 = $();
  return tmpReturnArg$3;
};
export { tmpAnonDefaultExport as default };
export { f };
export { g };
`````

## Output


`````js filename=intro
const f /*:()=>?*/ = function () {
  debugger;
  const tmpReturnArg /*:unknown*/ = $();
  return tmpReturnArg;
};
const g /*:()=>?*/ = function () {
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $();
  return tmpReturnArg$1;
};
const tmpCalleeParam /*:unknown*/ = $();
const tmpCalleeParam$1 /*:unknown*/ = $();
$(tmpCalleeParam, tmpCalleeParam$1);
const tmpAnonDefaultExport /*:()=>?*/ = function () {
  debugger;
  const tmpReturnArg$3 /*:unknown*/ = $();
  return tmpReturnArg$3;
};
export { tmpAnonDefaultExport as default };
export { f };
export { g };
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $();
  return b;
};
const c = function() {
  debugger;
  const d = $();
  return d;
};
const e = $();
const f = $();
$( e, f );
const g = function() {
  debugger;
  const h = $();
  return h;
};
export { g as default };
export { a as f };
export { c as g };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
