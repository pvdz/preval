# Preval test case

# noobs_between_with_read2.md

> Const promotion > Noobs between with read2

## Input

`````js filename=intro
let x = $(10);
const a = x;
x = $(20);
$(x, a, `final`);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(10);
const tmpClusterSSA_x /*:unknown*/ = $(20);
$(tmpClusterSSA_x, x, `final`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(10);
$($(20), x, `final`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
$( b, a, "final" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(10);
const a = x;
x = $(20);
$(x, a, `final`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 20, 10, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
