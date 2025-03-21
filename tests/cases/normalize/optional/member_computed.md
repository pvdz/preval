# Preval test case

# member_computed.md

> Normalize > Optional > Member computed
>
> Optional chaining fun

## Input

`````js filename=intro
const x = 10;
$(x?.[20]);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = (10)[20];
$(tmpChainElementObject);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$((10)[20]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 10[ 20 ];
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
