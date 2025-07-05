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
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $();
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $();
  const tmpReturnArg$3 /*:unknown*/ = $();
  $(tmpClusterSSA_tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1, tmpReturnArg$3);
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


## Normalized
(This is what phase1 received the first time)

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
  let tmpCalleeParam = f();
  let tmpCalleeParam$1 = g();
  let tmpCalleeParam$3 = h();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
export { tmpAnonDefaultExport as default };
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
