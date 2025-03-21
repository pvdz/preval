# Preval test case

# undefined.md

> Minus unary > Undefined
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-undefined);
`````


## Settled


`````js filename=intro
$(NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( NaN );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
