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


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg /*:unknown*/ = $();
  return tmpReturnArg;
};
const g /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $();
  return tmpReturnArg$1;
};
const h /*:()=>unknown*/ = function () {
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


## Denormalized
(This ought to be the final result)

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
  const tmpReturnArg$3 = $();
  return tmpReturnArg$3;
};
$($(), $(), $());
export { f };
export { h };
export { g };
`````


## PST Settled
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
