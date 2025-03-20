# Preval test case

# transitivity2rev.md

> Primitive arg inlining > Transitivity2rev
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
$(g(2)); 
$(f(1, 2)); // Should ultimately reuse the cloned func from the prev call
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1, 2);
const tmpReturnArg$1 /*:unknown*/ = $(tmpCalleeParam);
$(tmpReturnArg$1);
const tmpCalleeParam$3 /*:unknown*/ = $(1, 2);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($(1, 2)));
$($(1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, 2 );
const b = $( a );
$( b );
const c = $( 1, 2 );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2
 - 2: 1
 - 3: 1
 - 4: 1, 2
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
