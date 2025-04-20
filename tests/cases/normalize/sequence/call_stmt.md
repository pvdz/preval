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
$date_constructor();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$date_constructor();
`````


## PST Settled
With rename=true

`````js filename=intro
$();
$date_constructor();
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $date_constructor


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
