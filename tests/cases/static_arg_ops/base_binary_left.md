# Preval test case

# base_binary_left.md

> Static arg ops > Base binary left
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
function f(a, b, c) {
  $(a + $(1));
}
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````


## Settled


`````js filename=intro
const f /*:(number)=>undefined*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = $(1);
  const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
  $(tmpCalleeParam);
  return undefined;
};
f(1);
f(4);
f(6);
f(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a) {
  $(a + $(1));
};
f(1);
f(4);
f(6);
f(8);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $( 1 );
  const d = b + c;
  $( d );
  return undefined;
};
a( 1 );
a( 4 );
a( 6 );
a( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  const tmpBinBothLhs = a;
  const tmpBinBothRhs = $(1);
  let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
  $(tmpCalleeParam);
  return undefined;
};
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 5
 - 5: 1
 - 6: 7
 - 7: 1
 - 8: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
