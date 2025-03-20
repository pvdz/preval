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
const tmpCalleeParam /*:unknown*/ = $();
const tmpCalleeParam$1 /*:unknown*/ = $();
const tmpCalleeParam$3 /*:unknown*/ = $();
$(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
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
