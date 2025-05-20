# Preval test case

# return_closure_dollar.md

> Function > Return closure dollar
>
> Function that returns a closure

Trying to test a function that is "pure" (no observable side effects) but is not easy to inline (because it returns a closure).

I'm happy to reach a point where it can inline the function properly though :D

## Input

`````js filename=intro
const x = $(); // don't inline me
function f() {
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
