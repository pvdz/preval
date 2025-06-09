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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArgOverflow = $Number_NaN;
implicitGlobal;
let tmpCalleeParam = $Number_parseFloat(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseFloat


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
