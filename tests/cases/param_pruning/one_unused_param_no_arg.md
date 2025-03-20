# Preval test case

# one_unused_param_no_arg.md

> Param pruning > One unused param no arg
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x) {
  return $(10);
}
f();
`````


## Settled


`````js filename=intro
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
