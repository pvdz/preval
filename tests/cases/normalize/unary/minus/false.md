# Preval test case

# false.md

> Normalize > Unary > Minus > False
>
> Negative literals should be statically resolved where possible

## Input

`````js filename=intro
$(-false);
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
