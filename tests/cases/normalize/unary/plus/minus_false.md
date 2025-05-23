# Preval test case

# minus_false.md

> Normalize > Unary > Plus > Minus false
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(+(-false));
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
let tmpCalleeParam = -0;
$(tmpCalleeParam);
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
