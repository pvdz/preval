# Preval test case

# div.md

> Normalize > Binary > Div
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 / 3);
`````


## Settled


`````js filename=intro
$(1.6666666666666667);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.6666666666666667);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.6666666666666667 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 1.6666666666666667;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.6666666666666667
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
