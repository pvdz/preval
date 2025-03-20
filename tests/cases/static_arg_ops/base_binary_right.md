# Preval test case

# base_binary_right.md

> Static arg ops > Base binary right
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
function f(a, b, c) {
  $($(1) + a);
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
  const tmpBinLhs /*:unknown*/ = $(1);
  const tmpCalleeParam /*:primitive*/ = tmpBinLhs + a;
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
  $($(1) + a);
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
  const d = c + b;
  $( d );
  return undefined;
};
a( 1 );
a( 4 );
a( 6 );
a( 8 );
`````


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
