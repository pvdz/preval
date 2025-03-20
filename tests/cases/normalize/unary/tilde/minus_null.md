# Preval test case

# minus_null.md

> Normalize > Unary > Tilde > Minus null
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~(-null));
`````


## Settled


`````js filename=intro
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
