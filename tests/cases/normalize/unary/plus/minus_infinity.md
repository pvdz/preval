# Preval test case

# minus_infinity.md

> Normalize > Unary > Plus > Minus infinity
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(+(-Infinity));
`````


## Settled


`````js filename=intro
$($Number_NEGATIVE_INFINITY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NEGATIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NEGATIVE_INFINITY );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Number_NEGATIVE_INFINITY;
$($Number_NEGATIVE_INFINITY);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
