# Preval test case

# catastrophic_cancellation.md

> Math > Ai > Catastrophic cancellation
>
> Catastrophic cancellation: subtracting nearly equal large numbers

## Input

`````js filename=intro
const a = $(1e16 + 1);
const b = $(1e16);
const diff = a - b;
$(diff);
// Should be 1, but if precision is lost, could be 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10000000000000000);
const b /*:unknown*/ = $(10000000000000000);
const diff /*:number*/ = a - b;
$(diff);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(10000000000000000);
$(a - $(10000000000000000));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10000000000000000 );
const b = $( 10000000000000000 );
const c = a - b;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 10000000000000000;
const a = $(tmpCalleeParam);
const b = $(10000000000000000);
const diff = a - b;
$(diff);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10000000000000000
 - 2: 10000000000000000
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
