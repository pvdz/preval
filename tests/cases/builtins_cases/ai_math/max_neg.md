# Preval test case

# max_neg.md

> Builtins cases > Ai math > Max neg
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_max;
const x = -3;
$(x);
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
