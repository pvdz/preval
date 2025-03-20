# Preval test case

# nested_order.md

> Normalize > Hoisting > Exported func named > Nested order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f());
export function f() {
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
export { f };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $($(), $(), $());
};
f();
$(undefined);
export { f };
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
export { a as f };
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
