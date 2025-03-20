# Preval test case

# ignore_arguments.md

> Param pruning > Ignore arguments
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y, z) {
  return $(!!arguments, x, z);
}
f();
`````


## Settled


`````js filename=intro
$(true, undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true, undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true, undefined, undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
