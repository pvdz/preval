# Preval test case

# nested_order.md

> Normalize > Hoisting > Exported func default > Nested order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f());
export default function f() {
  $(f(), g(), h());

  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = $();
  const tmpCalleeParam$1 /*:unknown*/ = $();
  const tmpCalleeParam$3 /*:unknown*/ = $();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
f();
$(undefined);
export { f as default };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $($(), $(), $());
};
f();
$(undefined);
export { f as default };
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let f$1 = function () {
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
  $(f$1(), g(), h());
};
$(f());
export { f as default };
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let f$1 = function () {
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
  const tmpCalleeParam = f$1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$3 = h();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
export { f as default };
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $();
  const c = $();
  const d = $();
  $( b, c, d );
  return undefined;
};
a();
$( undefined );
export { a as default };
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
