# Preval test case

# return_closure_const.md

> Function > Return closure const
>
> Function that returns a closure

Trying to test a function that is "pure" (no observable side effects) but is not easy to inline (because it returns a closure).

I'm happy to reach a point where it can inline the function properly though :D

## Input

`````js filename=intro
const x = 'x'; // this will probably be inlined easily
function f() {
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
$(`x`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
