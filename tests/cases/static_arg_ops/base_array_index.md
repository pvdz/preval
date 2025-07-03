# Preval test case

# base_array_index.md

> Static arg ops > Base array index
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
const arr = [1, 2, 3, 4, 5, 6, 7];
function f(a, b, c) {
  $(arr[a]);
  $(a, b, c);
}
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````


## Settled


`````js filename=intro
const f /*:(number, number, primitive)=>undefined*/ = function ($$0, $$1, $$2) {
  const a /*:number*/ = $$0;
  const c /*:number*/ = $$1;
  const tmpCalleeParam /*:primitive*/ = $$2;
  debugger;
  $(tmpCalleeParam);
  $(a, 2, c);
  return undefined;
};
f(1, 3, 2);
f(4, 5, 5);
f(6, 7, 7);
f(8, 9, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a, c, tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, 2, c);
};
f(1, 3, 2);
f(4, 5, 5);
f(6, 7, 7);
f(8, 9, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  $( d );
  $( b, 2, c );
  return undefined;
};
a( 1, 3, 2 );
a( 4, 5, 5 );
a( 6, 7, 7 );
a( 8, 9, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  let tmpCalleeParam = arr[a];
  $(tmpCalleeParam);
  $(a, b, c);
  return undefined;
};
const arr = [1, 2, 3, 4, 5, 6, 7];
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
 - 1: 2
 - 2: 1, 2, 3
 - 3: 5
 - 4: 4, 2, 5
 - 5: 7
 - 6: 6, 2, 7
 - 7: undefined
 - 8: 8, 2, 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
