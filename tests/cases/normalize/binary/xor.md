# Preval test case

# xor.md

> Normalize > Binary > Xor
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 ^ 3);
`````


## Settled


`````js filename=intro
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 6;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
