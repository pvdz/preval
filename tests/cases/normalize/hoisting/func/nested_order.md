# Preval test case

# nested_order.md

> Normalize > Hoisting > Func > Nested order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f());
function f() {
  $(f(), g(), h());
    
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $();
const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $();
const tmpReturnArg$3 /*:unknown*/ = $();
$(tmpClusterSSA_tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1, tmpReturnArg$3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(), $(), $());
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = $();
const c = $();
$( a, b, c );
$( undefined );
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
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: undefined, undefined, undefined
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
