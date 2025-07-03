# Preval test case

# base_array_index3.md

> Static arg ops > Base array index3
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
const f /*:(number, number, unused)=>undefined*/ = function($$0, $$1, $$2) {
  const a /*:number*/ = $$0;
  const c /*:number*/ = $$1;
  const tmpOutlinedParam /*:unknown*/ = $$2;
  debugger;
  $(element);
  $(a, 2, c);
  return undefined;
};
const arr /*:array*/ /*truthy*/ = [ 1, 2, 3, 4, 5, 6, 7 ];
const tmpOAL /*:unknown*/ = arr[1];
f(1, 3, tmpOAL);
const tmpOAL$1 /*:unknown*/ = arr[4];
f(4, 5, tmpOAL$1);
const tmpOAL$3 /*:unknown*/ = arr[6];
f(6, 7, tmpOAL$3);
const tmpOAL$5 /*:unknown*/ = arr[8];
f(8, 9, tmpOAL$5);
`````


## Settled


`````js filename=intro
const f /*:(number, number)=>undefined*/ = function ($$0, $$1) {
  const $dlr_$$2 /*:number*/ = $$0;
  const $dlr_$$4 /*:number*/ = $$1;
  debugger;
  $(element);
  $($dlr_$$2, 2, $dlr_$$4);
  return undefined;
};
f(1, 3);
f(4, 5);
f(6, 7);
f(8, 9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($dlr_$$2, $dlr_$$4) {
  $(element);
  $($dlr_$$2, 2, $dlr_$$4);
};
f(1, 3);
f(4, 5);
f(6, 7);
f(8, 9);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  $( element );
  $( b, 2, c );
  return undefined;
};
a( 1, 3 );
a( 4, 5 );
a( 6, 7 );
a( 8, 9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0, $$1, $$2) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  let $dlr_$$2 = $$2;
  debugger;
  const a = $dlr_$$0;
  const c = $dlr_$$1;
  const tmpOutlinedParam = $dlr_$$2;
  $(element);
  $(a, 2, c);
  return undefined;
};
const arr = [1, 2, 3, 4, 5, 6, 7];
const tmpOAL = 2;
f(1, 3, tmpOAL);
const tmpOAL$1 = arr[4];
f(4, 5, tmpOAL$1);
const tmpOAL$3 = arr[6];
f(6, 7, tmpOAL$3);
const tmpOAL$5 = arr[8];
f(8, 9, tmpOAL$5);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

element


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
