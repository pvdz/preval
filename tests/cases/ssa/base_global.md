# Preval test case

# base_global.md

> Ssa > Base global
>
> Contrived example

## Input

`````js filename=intro
let x = $(5);
$(x);
// Next write can be SSA'd
x = $(10);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(5);
$(x);
const tmpClusterSSA_x /*:unknown*/ = $(10);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(5));
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
$( a );
const b = $( 10 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(5);
$(x);
x = $(10);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 10
 - 4: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
