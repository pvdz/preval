# Preval test case

# transitivity2.md

> Primitive arg inlining > Transitivity2
>
> Second attempt at trying to proc cloning cache

## Input

`````js filename=intro
function f(a, b) {
  return $(a, b);
}
function g(b) {
  return $(f(1, b));
}
$(f(1, 2));
$(g(2)); // Should ultimately reuse the cloned func from the prev call
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1, 2);
$(tmpCalleeParam$1);
const tmpCalleeParam /*:unknown*/ = $(1, 2);
const tmpReturnArg$1 /*:unknown*/ = $(tmpCalleeParam);
$(tmpReturnArg$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1, 2));
$($($(1, 2)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, 2 );
$( a );
const b = $( 1, 2 );
const c = $( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpReturnArg = $(a, b);
  return tmpReturnArg;
};
let g = function ($$0) {
  let b$1 = $$0;
  debugger;
  let tmpCalleeParam = f(1, b$1);
  const tmpReturnArg$1 = $(tmpCalleeParam);
  return tmpReturnArg$1;
};
let tmpCalleeParam$1 = f(1, 2);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = g(2);
$(tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2
 - 2: 1
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
