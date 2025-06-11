# Preval test case

# nanfinity.md

> Math > Nanfinity
>
> While not about LSBs, these are special values that can be lost if not handled carefully.

## Input

`````js filename=intro
$(NaN);
$(Infinity);
$(-Infinity);
`````


## Settled


`````js filename=intro
$($Number_NaN);
$($Number_POSITIVE_INFINITY);
$($Number_NEGATIVE_INFINITY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
$($Number_POSITIVE_INFINITY);
$($Number_NEGATIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
$( $Number_POSITIVE_INFINITY );
$( $Number_NEGATIVE_INFINITY );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$($Number_NaN);
$($Number_POSITIVE_INFINITY);
$(-Infinity);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: Infinity
 - 3: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
