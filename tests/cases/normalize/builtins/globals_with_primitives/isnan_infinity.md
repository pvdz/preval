# Preval test case

# isnan_infinity.md

> Normalize > Builtins > Globals with primitives > Isnan infinity
>
> Calling isNaN on a value that is a NaN should invariantly return true

## Input

`````js filename=intro
$(isNaN(Infinity));
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
