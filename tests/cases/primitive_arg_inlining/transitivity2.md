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
