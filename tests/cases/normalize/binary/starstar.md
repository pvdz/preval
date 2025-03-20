# Preval test case

# starstar.md

> Normalize > Binary > Starstar
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 ** 3);
`````


## Settled


`````js filename=intro
$(125);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(125);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 125 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 125
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
