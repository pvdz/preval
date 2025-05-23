# Preval test case

# ltlt.md

> Normalize > Binary > Ltlt
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 << 3);
`````


## Settled


`````js filename=intro
$(40);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(40);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 40 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 40;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 40
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
