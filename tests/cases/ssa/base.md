# Preval test case

# base.md

> Ssa > Base
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
