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
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $();
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $();
  const tmpReturnArg$3 /*:unknown*/ = $();
  $(tmpClusterSSA_tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1, tmpReturnArg$3);
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


## Normalized
(This is what phase1 received the first time)

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
  let tmpCalleeParam = f$1();
  let tmpCalleeParam$1 = g();
  let tmpCalleeParam$3 = h();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
let tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
export { f };
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
