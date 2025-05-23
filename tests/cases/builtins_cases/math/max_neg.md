# Preval test case

# max_neg.md

> Builtins cases > Math > Max neg
>
>

## Input

`````js filename=intro
const x = Math.max(-3, -3);
$(x);
`````


## Settled


`````js filename=intro
$(-3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
