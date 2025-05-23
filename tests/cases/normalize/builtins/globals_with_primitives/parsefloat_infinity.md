# Preval test case

# parsefloat_infinity.md

> Normalize > Builtins > Globals with primitives > Parsefloat infinity
>
> Calling parseFloat on a primitive should resolve

## Input

`````js filename=intro
$(parseFloat(Infinity));
`````


## Settled


`````js filename=intro
$($Number_POSITIVE_INFINITY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_POSITIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_POSITIVE_INFINITY );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Number_POSITIVE_INFINITY;
$($Number_POSITIVE_INFINITY);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
