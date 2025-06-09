# Preval test case

# isfinite_nan_plus_args.md

> Normalize > Builtins > Globals with primitives > Isfinite nan plus args
>
> Calling isFinite on a primitive should resolve

## Input

`````js filename=intro
$(isFinite(NaN, 1, "two", implicitGlobal, 3));
`````


## Settled


`````js filename=intro
implicitGlobal;
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
implicitGlobal;
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
implicitGlobal;
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArgOverflow = $Number_NaN;
implicitGlobal;
let tmpCalleeParam = isFinite(tmpArgOverflow);
$(tmpCalleeParam);
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
