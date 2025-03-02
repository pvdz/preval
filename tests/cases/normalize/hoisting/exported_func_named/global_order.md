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
let h = function () {
  debugger;
  return $();
};
$(f(), g(), h());
export { f };
export { h };
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
let h = function () {
  debugger;
  const tmpReturnArg$3 = $();
  return tmpReturnArg$3;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
const tmpCalleeParam$3 = h();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
export { f };
export { h };
export { g };
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  const tmpReturnArg /*:unknown*/ = $();
  return tmpReturnArg;
};
const g /*:()=>*/ = function () {
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $();
  return tmpReturnArg$1;
};
const h /*:()=>*/ = function () {
  debugger;
  const tmpReturnArg$3 /*:unknown*/ = $();
  return tmpReturnArg$3;
};
const tmpCalleeParam /*:unknown*/ = $();
const tmpCalleeParam$1 /*:unknown*/ = $();
const tmpCalleeParam$3 /*:unknown*/ = $();
$(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
export { f };
export { h };
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
const e = function() {
  debugger;
  const f = $();
  return f;
};
const g = $();
const h = $();
const i = $();
$( g, h, i );
export { a as f };
export { e as h };
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
