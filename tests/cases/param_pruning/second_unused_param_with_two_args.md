# Preval test case

# second_unused_param_with_two_args.md

> Param pruning > Second unused param with two args
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y) {
  return $(x);
}
f(10, 20);
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
