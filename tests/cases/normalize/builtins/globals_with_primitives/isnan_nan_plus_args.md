# Preval test case

# isnan_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Isnan nan plus args
>
> Calling isNaN on a value that is a NaN should invariantly return true

## Input

`````js filename=intro
$(isNaN(NaN, 1, "two", implicitGlobal, 3));
`````


## Settled


`````js filename=intro
implicitGlobal;
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
implicitGlobal;
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
implicitGlobal;
$( true );
`````


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
