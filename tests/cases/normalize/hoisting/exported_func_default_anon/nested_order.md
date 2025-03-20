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
