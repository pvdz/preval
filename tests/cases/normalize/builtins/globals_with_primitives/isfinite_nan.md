# Preval test case

# isfinite_nan.md

> Normalize > Builtins > Globals with primitives > Isfinite nan
>
> Calling isFinite on a primitive should resolve

## Input

`````js filename=intro
$(isFinite(NaN));
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
