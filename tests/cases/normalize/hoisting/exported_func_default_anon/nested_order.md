# Preval test case

# nested_order.md

> Normalize > Hoisting > Exported func default anon > Nested order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(1);
export default function() {
  $(f(), g(), h());
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Settled


`````js filename=intro
$(1);
const tmpAnonDefaultExport /*:()=>undefined*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = $();
  const tmpCalleeParam$1 /*:unknown*/ = $();
  const tmpCalleeParam$3 /*:unknown*/ = $();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
export { tmpAnonDefaultExport as default };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  $($(), $(), $());
};
export { tmpAnonDefaultExport as default };
`````

## Pre Normal


`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
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
};
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
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
  const tmpCalleeParam = f();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$3 = h();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
export { tmpAnonDefaultExport as default };
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = function() {
  debugger;
  const b = $();
  const c = $();
  const d = $();
  $( b, c, d );
  return undefined;
};
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
