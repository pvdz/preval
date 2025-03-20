# Preval test case

# return_local_closure.md

> Function inlining > Return local closure
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function g() {
  let y = $(10);
  function f() {
    return y;
  }
  return f();
}
$(g());
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(10);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
