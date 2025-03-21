# Preval test case

# return_arr_lits.md

> Function inlining > Return arr lits
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return [10, 20, 30];
}
$(f());
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:array*/ = [10, 20, 30];
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([10, 20, 30]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
