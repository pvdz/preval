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
