# Preval test case

# number_tostring_stmt.md

> Property lookup > Number tostring stmt

## Input

`````js filename=intro
$Number_prototype.toString; // dropme
$( "3.48" );
`````


## Settled


`````js filename=intro
$(`3.48`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`3.48`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "3.48" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '3.48'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
