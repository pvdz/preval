# Preval test case

# zero.md

> Minus unary > Zero
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-0);
`````


## Settled


`````js filename=intro
$(-0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(-0);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
