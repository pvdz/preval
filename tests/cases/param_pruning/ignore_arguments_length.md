# Preval test case

# ignore_arguments_length.md

> Param pruning > Ignore arguments length
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y, z) {
  return $(arguments.length, x, z);
}
f();
`````


## Settled


`````js filename=intro
$(0, undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0, undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0, undefined, undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
