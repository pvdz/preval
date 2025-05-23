# Preval test case

# return_lit_thrice.md

> Function inlining > Return lit thrice
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return 10;
}
$(f());
$(f());
$(f());
`````


## Settled


`````js filename=intro
$(10);
$(10);
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(10);
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 10 );
$( 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
