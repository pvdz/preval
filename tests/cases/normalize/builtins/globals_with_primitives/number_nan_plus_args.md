# Preval test case

# number_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Number nan plus args
>
> Calling Number on a primitive should resolve

## Input

`````js filename=intro
$(Number(NaN, 1, "two", implicitGlobal, 3));
`````


## Settled


`````js filename=intro
implicitGlobal;
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
implicitGlobal;
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
implicitGlobal;
$( $Number_NaN );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

implicitGlobal


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
