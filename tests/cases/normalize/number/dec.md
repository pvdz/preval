# Preval test case

# dec.md

> Normalize > Number > Dec
>
> Numbers should be printed as decimals. Because. Yes.

## Input

`````js filename=intro
$(1e10);
$(1e1000);
`````


## Settled


`````js filename=intro
$(10000000000);
$($Number_POSITIVE_INFINITY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10000000000);
$($Number_POSITIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10000000000 );
$( $Number_POSITIVE_INFINITY );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10000000000
 - 2: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
