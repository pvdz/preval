# Preval test case

# call_stmt.md

> Normalize > Sequence > Call stmt
>
> Expression statement that is a call with callee that is a sequence

## Input

`````js filename=intro
($(), Date)();
`````


## Settled


`````js filename=intro
$();
Date();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
Date();
`````


## PST Settled
With rename=true

`````js filename=intro
$();
Date();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
