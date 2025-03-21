# Preval test case

# parsefloat_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Parsefloat nan plus args
>
> Calling parseFloat on a primitive should resolve

## Input

`````js filename=intro
$(parseFloat(NaN, 1, "two", implicitGlobal, 3));
`````


## Settled


`````js filename=intro
implicitGlobal;
$(NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
implicitGlobal;
$(NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
implicitGlobal;
$( NaN );
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
