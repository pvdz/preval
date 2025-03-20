# Preval test case

# ternary_test.md

> Normalize > Pattern > Assignment > Base contexts > Ternary test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 1, b = 2, c = 3;
({ x } = 1) ? b : c;
`````


## Settled


`````js filename=intro
(1).x;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).x;
`````


## PST Settled
With rename=true

`````js filename=intro
1.x;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
