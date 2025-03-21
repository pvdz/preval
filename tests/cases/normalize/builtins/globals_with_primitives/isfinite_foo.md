# Preval test case

# isfinite_foo.md

> Normalize > Builtins > Globals with primitives > Isfinite foo
>
> Calling isFinite on a primitive should resolve

## Input

`````js filename=intro
$(isFinite("foo"));
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
